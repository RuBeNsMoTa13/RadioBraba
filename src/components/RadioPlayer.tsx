
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioState } from "@/lib/types";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { radioStations } from "@/lib/data"; // Certifique-se que esta URL está atualizada aqui!
import { cn } from "@/lib/utils";

export function RadioPlayer({ className }: { className?: string }) {
  // Persistência do volume no localStorage
  function getInitialVolume() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('radio_volume');
      if (saved !== null) return parseFloat(saved);
    }
    return 0.5;
  }

  // Adicione estado para música atual e foto
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentSongImage, setCurrentSongImage] = useState<string | null>(null);

  const [radioState, setRadioState] = useState<RadioState>({
    isPlaying: false,
    volume: getInitialVolume(), // Começa com 50% ou valor salvo
    station: radioStations[0],
  });
  const [previousVolume, setPreviousVolume] = useState(radioState.volume);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  // Persistir volume no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('radio_volume', String(radioState.volume));
    }
  }, [radioState.volume]);

  // Simulação: Atualize aqui para buscar dados reais da música se houver endpoint/metadata
  useEffect(() => {
    // Exemplo: polling a cada 10s para buscar música atual
    const interval = setInterval(() => {
      // Aqui você pode fazer um fetch para um endpoint que retorna a música atual
      // Exemplo fictício:
      // fetch('/api/current-song').then(res => res.json()).then(data => {
      //   setCurrentSong(data.title);
      //   setCurrentSongImage(data.imageUrl);
      // });
      // Por enquanto, usa o dado da estação (mock)
      setCurrentSong(radioState.station.currentSong || 'Sem informação');
      setCurrentSongImage(radioState.station.currentSongImage || null);
    }, 10000);
    // Atualiza imediatamente ao trocar estação
    setCurrentSong(radioState.station.currentSong || 'Sem informação');
    setCurrentSongImage(radioState.station.currentSongImage || null);
    return () => clearInterval(interval);
  }, [radioState.station]);

  // 1. useEffect para inicialização do objeto Audio e atualização da URL do stream
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Listeners para status e reconexão
      audioRef.current.oncanplay = () => {
        // Só mostra 'playing' se realmente pode tocar
        if (audioRef.current && !audioRef.current.paused) {
          setStatus('playing');
        } else {
          setStatus('idle');
        }
        console.log("Stream pronto para tocar (canplay).");
      };
      audioRef.current.onplaying = () => {
        setStatus('playing');
        console.log("Conexão feita com sucesso! Stream está tocando (playing).");
      };
      audioRef.current.onpause = () => {
        setStatus('idle');
        console.log("Stream pausado.");
      };
      audioRef.current.onended = () => {
        setStatus('error');
        console.log("Stream terminou.");
        tentarReconectar();
      };
      audioRef.current.onerror = (e) => {
        setStatus('error');
        const error = audioRef.current?.error;
        if (error) {
          console.error("Erro no áudio:", error, "Código:", error.code);
          switch (error.code) {
            case 1: console.error("Abortado pelo usuário."); break;
            case 2: console.error("Erro de rede."); break;
            case 3: console.error("Erro ao decodificar o stream."); break;
            case 4: console.error("Formato do stream não suportado."); break;
            default: console.error("Erro desconhecido.");
          }
        } else {
          console.error("Erro desconhecido no elemento de áudio.", e);
        }
        tentarReconectar();
      };
      audioRef.current.onstalled = () => {
        setStatus('connecting');
        console.warn("Stream travou (stalled).");
        tentarReconectar();
      };
    }
    // Atualiza a URL da fonte e carrega o stream apenas quando a estação muda
    if (audioRef.current.src !== radioState.station.streamUrl) {
      setStatus('connecting');
      audioRef.current.src = radioState.station.streamUrl;
      audioRef.current.load();
      if (radioState.isPlaying) {
        audioRef.current.play().catch(() => {
          setStatus('error');
          setRadioState(prev => ({...prev, isPlaying: false}));
        });
      }
    }
    // Limpeza dos listeners e reconexão
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
  }, [radioState.station.streamUrl]);

  // Função para tentar reconectar
  function tentarReconectar() {
    setStatus('connecting');
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    reconnectTimeout.current = setTimeout(() => {
      if (audioRef.current && radioState.isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {
          setStatus('error');
          setRadioState(prev => ({...prev, isPlaying: false}));
        });
      }
    }, 3000);
  }

  // 2. useEffect para controle de play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (radioState.isPlaying) {
      setStatus('connecting');
      audioRef.current.play().then(() => {
        setStatus('playing');
      }).catch(error => {
        setStatus('error');
        console.error("Erro ao tentar reproduzir áudio (play):", error);
        if (error.name === "NotAllowedError" || error.name === "AbortError") {
          console.warn("Reprodução automática bloqueada pelo navegador. O usuário precisa interagir ou o contexto não permite.");
        }
        setRadioState(prev => ({...prev, isPlaying: false}));
      });
    } else {
      audioRef.current.pause();
      setStatus('idle');
    }
  }, [radioState.isPlaying]);

  // 3. useEffect para controle de volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = radioState.volume;
  }, [radioState.volume]);

  // 4. useEffect de limpeza global
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  // Acessibilidade: aria-labels e roles
  const togglePlay = () => {
    setRadioState(prev => ({...prev, isPlaying: !prev.isPlaying}));
  };

  const handleVolumeChange = (value: number[]) => {
    setRadioState(prev => ({ ...prev, volume: value[0] }));
    if (value[0] > 0) {
      setPreviousVolume(value[0]);
    }
  };

  const toggleMute = () => {
    setRadioState(prev => {
      if (prev.volume === 0) {
        return { ...prev, volume: previousVolume || 0.5 };
      } else {
        setPreviousVolume(prev.volume);
        return { ...prev, volume: 0 };
      }
    });
  };

  return (
    <Card className={cn("bg-white text-black p-4 rounded-xl shadow-lg border-0", className)}>
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-lg border-0 text-black hover:text-pink-500 transition-colors"
          aria-label={radioState.isPlaying ? "Pausar rádio" : "Tocar rádio"}
        >
          {radioState.isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
          <span className="sr-only">
            {radioState.isPlaying ? "Pause" : "Play"}
          </span>
        </Button>

        <div className="flex-1 min-w-0 bg-white rounded-lg overflow-x-hidden flex items-center gap-2">
          {/* Exibe a foto da música se houver */}
          {currentSongImage && (
            <img src={currentSongImage} alt="Capa da música" className="w-12 h-12 rounded shadow border object-cover" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold truncate text-black">{radioState.station.name}</h3>
            <p className="text-xs text-pink-500 truncate font-medium">
              {/* Exibe o nome da música se houver */}
              {currentSong ? `♪ Tocando agora: ${currentSong}` : '♪ Tocando agora: Ao vivo'}
            </p>
            {/* Feedback visual de status */}
            {status === 'connecting' && <span className="text-xs text-yellow-600">Conectando...</span>}
            {status === 'error' && <span className="text-xs text-red-600">Erro ao conectar. Tentando novamente...</span>}
          </div>
        </div>

        <div className="flex items-center h-16 bg-white rounded-lg">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="text-black hover:text-pink-500 hover:bg-gray-100 transition-colors rounded-full"
            aria-label={radioState.volume === 0 ? "Desmutar" : "Mutar"}
          >
            {radioState.volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
            <span className="sr-only">Mute</span>
          </Button>

          <div className="w-12 bg-gray-100 rounded-full p-1 shadow-inner">
            <Slider
              value={[radioState.volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-full [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-pink-400 [&>span:first-child]:to-pink-600 [&>span:first-child]:shadow-sm [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-pink-400 [&_[role=slider]]:shadow-md"
              aria-label="Controle de volume"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}