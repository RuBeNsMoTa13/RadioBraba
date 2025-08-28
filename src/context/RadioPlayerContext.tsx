import { createContext, useContext, useEffect, useRef, useState, ReactNode, useMemo, useCallback } from 'react';
import { radioStations } from '@/lib/data';

// --- CONFIGURAÇÃO ---
const XCAST_API_URL = "https://xcast.com.br/api-json/VkRGU1JrNUZOVzVRVkRBOStS";
const API_POLLING_INTERVAL = 16000;
const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;
// --- FIM DA CONFIGURAÇÃO ---

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
function decodeHtml(text: string): string {
  if (!text) return "";
  const replacements = {
    'Ã¡': 'á', 'Ã©': 'é', 'Ã­': 'í', 'Ã³': 'ó', 'Ãº': 'ú',
    'Ã£': 'ã', 'Ãµ': 'õ', 'Ã¢': 'â', 'Ãª': 'ê', 'Ã§': 'ç',
    'Ã€': 'À', 'Ã‰': 'É', 'ÃŒ': 'Ì', 'Ã"': 'Ó', 'Ãš': 'Ú',
    'Ãƒ': 'Ã', 'Ã•': 'Õ', 'Ã‚': 'Â', 'ÃŠ': 'Ê', 'Ã‡': 'Ç',
    'VÃ­deo': 'Vídeo',
    'Ãudio': 'Áudio',
  };
  let decodedText = text;
  for (const [malformed, correct] of Object.entries(replacements)) {
    decodedText = decodedText.replace(new RegExp(malformed, 'g'), correct);
  }
  return decodedText;
}

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('radio_volume');
      return savedVolume ? parseFloat(savedVolume) : 0.5;
    }
    return 0.5;
  });
  const [currentSong, setCurrentSong] = useState(radioStations[0].currentSong || 'Carregando...');
  // A capa da rádio Braba será a imagem padrão, sem buscar da API
  const currentSongImage = '/images/RadioBraba.png';
  const [status, setStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptCounter = useRef(0);

  const station = useMemo(() => radioStations[0], []);

  // Otimizar função de reconexão com useCallback
  const initiateReconnect = useCallback(() => {
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
  }, []);

  // Otimizar busca de dados com useCallback
  const fetchXcastData = useCallback(async () => {
    try {
      const response = await fetch(XCAST_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setCurrentSong(decodeHtml(data.musica_atual) || "Ao vivo");
      
    } catch (error) {
      console.error("Erro ao buscar dados da XCast API (provável CORS ou rede):", error);
      setCurrentSong("Falha ao carregar");
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchXcastData, API_POLLING_INTERVAL);
    fetchXcastData();

    return () => clearInterval(intervalId);
  }, [fetchXcastData]);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;

      const handleCanPlay = () => {
        if (audioRef.current && !audioRef.current.paused) {
          setStatus('playing');
        } else {
          setStatus('idle');
        }
      };
      const handlePlaying = () => setStatus('playing');
      const handlePause = () => setStatus('idle');
      const handleEnded = () => {
        console.log("Stream terminou.");
        setIsPlaying(false);
        initiateReconnect();
      };
      const handleError = (e: Event) => {
        const error = audio.error;
        console.error("Erro no áudio:", error, "Código:", error?.code, "Evento:", e);
        setStatus('error');
        setIsPlaying(false);
        initiateReconnect();
      };
      const handleStalled = () => {
        console.warn("Stream travou (stalled).");
        setStatus('connecting');
        initiateReconnect();
      };

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
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };
    }

    if (audioRef.current.src !== station.streamUrl) {
      setStatus('connecting');
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      if (isPlaying) { audioRef.current.pause(); }
    }
  }, [station.streamUrl, isPlaying, initiateReconnect]);

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
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('radio_volume', String(volume));
    }
  }, [volume]);

  // Memorizar o valor do contexto para evitar re-renders desnecessários
  const contextValue = useMemo(() => ({
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    currentSong,
    currentSongImage,
    status,
  }), [isPlaying, volume, currentSong, currentSongImage, status]);

  return (
    <RadioPlayerContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        style={{ display: 'none' }}
        preload="metadata"
      >
        <source src={station.streamUrl} type="audio/aac" />
        <source src={station.streamUrl} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </RadioPlayerContext.Provider>
  );
}