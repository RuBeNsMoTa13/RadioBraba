import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { radioStations } from '@/lib/data'; // Certifique-se que o caminho e o conteúdo estão corretos

// A URL da API da XCast para pegar os dados da rádio
const XCAST_API_URL = "https://xcast.com.br/api-json/VDFSRk5FNW5QVDA9KzU=";
const RECONNECT_DELAY_MS = 3000; // Atraso de 3 segundos antes de tentar reconectar
const MAX_RECONNECT_ATTEMPTS = 5; // Limite de tentativas de reconexão

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
  const [currentSongImage, setCurrentSongImage] = useState(radioStations[0].currentSongImage || '/images/RadioBraba.png');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptCounter = useRef(0);

  const station = radioStations[0];

  // Lógica para buscar informações da música da API da XCast
  useEffect(() => {
    const fetchXcastData = async () => {
      try {
        const response = await fetch(XCAST_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setCurrentSong(data.musica_atual || "Ao vivo");
        // AQUI: A capa da música é sempre a padrão da XCast por algum motivo.
        // O problema não é o código abaixo, mas a fonte da informação.
        setCurrentSongImage(data.capa_musica || "/images/RadioBraba.png"); 
        
        console.log("Dados da XCast API atualizados:", data);

      } catch (error) {
        console.error("Erro ao buscar dados da XCast API (provável CORS ou rede):", error);
        setCurrentSong("Falha ao carregar");
        setCurrentSongImage("/images/RadioBraba.png");
      }
    };

    // CORREÇÃO CRÍTICA: Mudar o intervalo para MAIS DE 15 segundos, como a API da XCast exige.
    const intervalId = setInterval(fetchXcastData, 16000); // 16 segundos, para ser superior a 15s
    fetchXcastData(); // Busca inicial imediatamente na montagem do provedor

    return () => clearInterval(intervalId);
  }, []); // Este efeito roda apenas uma vez (na montagem e desmontagem do provedor)

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

  // 1. useEffect principal para controle do <audio> e seus listeners
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
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('stalled', handleStalled);
        
        audio.pause();
        audio.src = '';
        audio.load();
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };
    }

    // Define a URL do stream se ela mudar (ex: se tiver várias estações)
    if (audioRef.current.src !== station.streamUrl) {
      setStatus('connecting');
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      // CORREÇÃO: Removido o play() daqui. O useEffect de isPlaying é quem controla o play/pause.
      // if (isPlaying) { audioRef.current.pause(); } // Pausa anterior se já tocando
    }
  }, [station.streamUrl, setIsPlaying]);

  // 2. useEffect para controlar play/pause baseado no estado 'isPlaying'
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
          console.warn("Reprodução automática bloqueada. O usuário precisa interagir.");
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

  // 3. useEffect para sincronizar o volume do HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 4. useEffect para persistir o volume no localStorage
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