import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioState } from "@/lib/types";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { radioStations } from "@/lib/data"; // Certifique-se que esta URL está atualizada aqui!
import { cn } from "@/lib/utils";

export function RadioPlayer({ className }: { className?: string }) {
  const [radioState, setRadioState] = useState<RadioState>({
    isPlaying: false,
    volume: 0.8,
    station: radioStations[0], // Usará a primeira estação da sua lista
  });

  const [currentSong, setCurrentSong] = useState(radioStations[0].currentSong);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === CÓDIGO ALTERADO (useEffects separados e otimizados) ===

  // 1. useEffect para inicialização do objeto Audio e atualização da URL do stream
  // Este efeito é responsável por criar o objeto Audio e garantir que ele tenha a URL correta.
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Opcional: Adicionar listeners globais aqui para depuração ou estado da rádio
      // audioRef.current.oncanplay = () => console.log("Stream pode começar a tocar.");
      // audioRef.current.onplaying = () => console.log("Stream está tocando.");
      // audioRef.current.onpause = () => console.log("Stream pausado.");
      // audioRef.current.onended = () => {
      //   console.log("Stream terminou.");
      //   setRadioState(prev => ({...prev, isPlaying: false}));
      // };
      audioRef.current.onerror = (e) => {
        console.error("Erro no elemento de áudio (src/load):", e);
        // Em caso de erro ao carregar a fonte, pare de tentar tocar
        setRadioState(prev => ({...prev, isPlaying: false}));
      };
    }

    // Atualiza a URL da fonte e carrega o stream apenas quando a estação muda
    if (audioRef.current.src !== radioState.station.streamUrl) {
      audioRef.current.src = radioState.station.streamUrl;
      audioRef.current.load(); // Carrega o novo stream
      // Se estava tocando antes e a URL mudou, pause a anterior
      // O play será re-tentado no próximo useEffect se isPlaying for true
      if (radioState.isPlaying) {
        audioRef.current.pause();
      }
    }

    // Não há retorno de limpeza aqui, a limpeza global será no useEffect final
  }, [radioState.station.streamUrl]); // Este efeito depende APENAS da URL da estação

  // 2. useEffect para controle de play/pause
  // Este efeito é responsável APENAS por iniciar ou pausar a reprodução.
  useEffect(() => {
    if (!audioRef.current) return; // Garante que o objeto Audio existe

    if (radioState.isPlaying) {
      // Tenta tocar o áudio. Esta chamada é feita APENAS quando isPlaying muda para true.
      audioRef.current.play().catch(error => {
        console.error("Erro ao tentar reproduzir áudio (play):", error);
        // Captura e informa sobre o bloqueio de autoplay
        if (error.name === "NotAllowedError" || error.name === "AbortError") {
          console.warn("Reprodução automática bloqueada pelo navegador. O usuário precisa interagir ou o contexto não permite.");
        }
        // Em caso de falha no play, defina isPlaying para false para refletir o estado real
        setRadioState(prev => ({...prev, isPlaying: false})); // Define para false se não conseguir tocar
      });
    } else {
      // Pausa o áudio
      audioRef.current.pause();
    }
  }, [radioState.isPlaying]); // Este efeito depende APENAS do estado isPlaying

  // 3. useEffect para controle de volume
  // Este efeito é responsável APENAS por ajustar o volume.
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = radioState.volume;
  }, [radioState.volume]); // Este efeito depende APENAS do estado volume

  // 4. useEffect de limpeza global (roda uma vez ao desmontar o componente)
  // Garante que o áudio pare e os recursos sejam liberados quando o player não estiver mais em uso.
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // Limpa a fonte para liberar recursos
        audioRef.current.load();
        // Se você adicionou event listeners no primeiro useEffect, remova-os aqui também
      }
    };
  }, []); // Array de dependências vazio para rodar apenas na montagem/desmontagem

  // === FIM DO CÓDIGO ALTERADO ===


  const togglePlay = () => {
    setRadioState(prev => ({...prev, isPlaying: !prev.isPlaying}));
  };

  const handleVolumeChange = (value: number[]) => {
    setRadioState(prev => ({...prev, volume: value[0]}));
  };

  const toggleMute = () => {
    setRadioState(prev => ({
      ...prev,
      volume: prev.volume === 0 ? 0.8 : 0
    }));
  };

  return (
    <Card className={cn("bg-white text-black p-4 rounded-xl shadow-lg border-0", className)}>
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-lg border-0 text-black hover:text-pink-500 transition-colors"
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

        <div className="flex-1 min-w-0 bg-white rounded-lg overflow-x-hidden">
          <h3 className="font-bold truncate text-black">{radioState.station.name}</h3>
          <p className="text-xs text-pink-500 truncate font-medium">
            ♪ Tocando agora: Ao vivo
          </p>
        </div>

        <div className="flex items-center h-16 bg-white rounded-lg">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="text-black hover:text-pink-500 hover:bg-gray-100 transition-colors rounded-full"
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
            />
          </div>
        </div>
      </div>
    </Card>
  );
}