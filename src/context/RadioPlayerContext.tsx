import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { radioStations } from '@/lib/data';

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
  if (!ctx) throw new Error('useRadioPlayer deve ser usado dentro de RadioPlayerProvider');
  return ctx;
}

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState(radioStations[0].currentSong || 'Sem informação');
  const [currentSongImage, setCurrentSongImage] = useState(radioStations[0].currentSongImage || '');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const station = radioStations[0];

  // Atualiza música/capa (mock, substitua por fetch real se houver endpoint)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSong(station.currentSong || 'Sem informação');
      setCurrentSongImage(station.currentSongImage || '');
    }, 10000);
    setCurrentSong(station.currentSong || 'Sem informação');
    setCurrentSongImage(station.currentSongImage || '');
    return () => clearInterval(interval);
  }, [station]);

  // Controle do <audio> global
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.oncanplay = () => {
        if (audioRef.current && !audioRef.current.paused) {
          setStatus('playing');
        } else {
          setStatus('idle');
        }
      };
      audioRef.current.onplaying = () => setStatus('playing');
      audioRef.current.onpause = () => setStatus('idle');
      audioRef.current.onended = () => {
        setStatus('error');
        tentarReconectar();
      };
      audioRef.current.onerror = () => {
        setStatus('error');
        tentarReconectar();
      };
      audioRef.current.onstalled = () => {
        setStatus('connecting');
        tentarReconectar();
      };
    }
    if (audioRef.current.src !== station.streamUrl) {
      setStatus('connecting');
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setStatus('error');
          setIsPlaying(false);
        });
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        audioRef.current.oncanplay = null;
        audioRef.current.onplaying = null;
        audioRef.current.onpause = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.onstalled = null;
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [station.streamUrl]);

  function tentarReconectar() {
    setStatus('connecting');
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    reconnectTimeout.current = setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {
          setStatus('error');
          setIsPlaying(false);
        });
      }
    }, 3000);
  }

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      setStatus('connecting');
      audioRef.current.play().then(() => setStatus('playing')).catch(() => {
        setStatus('error');
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
      setStatus('idle');
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // Persistência do volume no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('radio_volume', String(volume));
    }
  }, [volume]);

  return (
    <RadioPlayerContext.Provider value={{ isPlaying, setIsPlaying, volume, setVolume, currentSong, currentSongImage, status }}>
      {children}
    </RadioPlayerContext.Provider>
  );
} 