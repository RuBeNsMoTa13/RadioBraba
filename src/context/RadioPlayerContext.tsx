import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { radioStations } from '@/lib/data';

// --- CONFIGURAÇÃO ---
const XCAST_API_URL = "https://xcast.com.br/api-json/VkRGU1JrNUZOVzVRVkRBOStS";
const XCAST_DEFAULT_COVER_URL = "https://player.xcast.com.br/img/img-capa-artista-padrao.png";
const API_POLLING_INTERVAL = 16000;
const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;
// --- FIM DA CONFIGURAÇÃO ---

// Definição dos tipos para o Contexto
interface RadioPlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  currentSong: string;
  currentSongImage: string;
  status: 'idle' | 'connecting' | 'playing' | 'error';
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext);
  if (ctx === undefined) {
    throw new Error('useRadioPlayer deve ser usado dentro de um RadioPlayerProvider');
  }
  return ctx;
}

// Função para corrigir a codificação de caracteres
// Movida para fora do componente para melhor organização
function decodeHtml(text: any) {
  if (!text) return "";
  const replacements = {
    'Ã¡': 'á', 'Ã©': 'é', 'Ã­': 'í', 'Ã³': 'ó', 'Ãº': 'ú',
    'Ã£': 'ã', 'Ãµ': 'õ', 'Ã¢': 'â', 'Ãª': 'ê', 'Ã§': 'ç',
    'Ã': 'Á', 'Ã‰': 'É', 'Ã': 'Í', 'Ã“': 'Ó', 'Ãš': 'Ú',
    'Ãƒ': 'Ã', 'Ã•': 'Õ', 'Ã‚': 'Â', 'ÃŠ': 'Ê', 'Ã‡': 'Ç',
    'VÃ­deo': 'Vídeo',
    'Ãudio': 'Áudio',
  };
  let decodedText = text;
  for (const [malformed, correct] of Object.entries(replacements)) {
    decodedText = decodedText.replace(new RegExp(malformed, 'g'), correct);
  }
  return decodedText;
}

// Provedor do Contexto
export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  // === ESTADOS E REFERÊNCIAS ===
  // Estados principais do player
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('radio_volume');
      return savedVolume ? parseFloat(savedVolume) : 0.5;
    }
    return 0.5;
  });
  const [currentSong, setCurrentSong] = useState(radioStations[0].currentSong || 'Carregando...');
  const [currentSongImage, setCurrentSongImage] = useState(radioStations[0].currentSongImage || '/images/RadioBraba.png');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');

  // Referências para o elemento de áudio e reconexão
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptCounter = useRef(0);

  const station = radioStations[0]; // Assumindo apenas uma estação

  // === LÓGICA DE RECONEXÃO ===
  // Função auxiliar para iniciar o processo de reconexão controlada
  const initiateReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    reconnectAttemptCounter.current += 1;
    setStatus('connecting');

    if (reconnectAttemptCounter.current <= MAX_RECONNECT_ATTEMPTS) {
      console.log(`Tentando reconectar #${reconnectAttemptCounter.current}...`);
      reconnectTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().then(() => {
            console.log("Reconexão bem-sucedida!");
            setStatus('playing');
            reconnectAttemptCounter.current = 0;
          }).catch(error => {
            console.error("Falha na tentativa de reconexão:", error);
          });
        }
      }, RECONNECT_DELAY_MS);
    } else {
      console.error("Máximo de tentativas de reconexão atingido. Tente novamente manualmente.");
      setStatus('error');
      setIsPlaying(false);
      reconnectAttemptCounter.current = 0;
    }
  };

  // === EFEITOS (useEffects) ===

  // Efeito 1: Busca de informações da música da API da XCast
  // Roda uma vez na montagem do provedor e a cada API_POLLING_INTERVAL.
  useEffect(() => {
    const fetchXcastData = async () => {
      try {
        const response = await fetch(XCAST_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        setCurrentSong(decodeHtml(data.musica_atual) || "Ao vivo");
        if (data.capa_musica && data.capa_musica !== XCAST_DEFAULT_COVER_URL) {
            setCurrentSongImage(data.capa_musica);
        } else {
            setCurrentSongImage("/images/RadioBraba.png");
        }
        console.log("Dados da XCast API atualizados:", data);
      } catch (error) {
        console.error("Erro ao buscar dados da XCast API (provável CORS ou rede):", error);
        setCurrentSong("Falha ao carregar");
        setCurrentSongImage("/images/RadioBraba.png");
      }
    };

    const intervalId = setInterval(fetchXcastData, API_POLLING_INTERVAL);
    fetchXcastData();

    return () => clearInterval(intervalId);
  }, []);

  // Efeito 2: Inicialização do <audio> e gerenciamento de seus listeners
  // Roda uma vez na montagem para configurar o elemento de áudio.
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;

      // Listeners para eventos do elemento de áudio
      const handleCanPlay = () => { if (audio.paused) { setStatus('idle'); } };
      const handlePlaying = () => setStatus('playing');
      const handlePause = () => setStatus('idle');
      const handleEnded = () => { setIsPlaying(false); initiateReconnect(); };
      const handleError = (e: Event) => {
        console.error("Erro no áudio:", audio.error, "Código:", audio.error?.code, "Evento:", e);
        setStatus('error'); setIsPlaying(false); initiateReconnect();
      };
      const handleStalled = () => { setStatus('connecting'); initiateReconnect(); };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('stalled', handleStalled);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay); audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('pause', handlePause); audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError); audio.removeEventListener('stalled', handleStalled);
        audio.pause(); audio.src = ''; audio.load();
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      };
    }
  }, []);

  // Efeito 3: Atualiza a URL do stream se a estação mudar
  useEffect(() => {
    if (audioRef.current && audioRef.current.src !== station.streamUrl) {
      setStatus('connecting');
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      if (isPlaying) { audioRef.current.pause(); }
    }
  }, [station.streamUrl, isPlaying, setIsPlaying]);

  // Efeito 4: Controla play/pause com base no estado 'isPlaying'
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      setStatus('connecting');
      audioRef.current.play().then(() => {
        setStatus('playing');
        reconnectAttemptCounter.current = 0;
      }).catch(error => {
        console.error("Erro ao tentar reproduzir áudio (play):", error);
        if (error.name === "NotAllowedError" || error.name === "AbortError") {
          console.warn("Reprodução automática bloqueada.");
          setStatus('idle');
        } else {
          setStatus('error');
        }
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
      setStatus('idle');
      reconnectAttemptCounter.current = 0;
    }
  }, [isPlaying, setIsPlaying]);

  // Efeito 5: Sincroniza o volume do HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Efeito 6: Persiste o volume no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('radio_volume', String(volume));
    }
  }, [volume]);

  const contextValue = {
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    currentSong,
    currentSongImage,
    status,
  };

  return (
    <RadioPlayerContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        style={{ display: 'none' }}
        preload="auto"
      >
        <source src={station.streamUrl} type="audio/aac" />
        <source src={station.streamUrl} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </RadioPlayerContext.Provider>
  );
}