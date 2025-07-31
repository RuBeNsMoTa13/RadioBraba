
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { radioStations } from "@/lib/data"; // Certifique-se que esta URL está atualizada aqui!
import { cn } from "@/lib/utils";
import { useRadioPlayer } from "@/context/RadioPlayerContext";

export function RadioPlayer({ className }: { className?: string }) {
  const { isPlaying, setIsPlaying, volume, setVolume, currentSong, currentSongImage, status } = useRadioPlayer();
  // Persistência do volume no localStorage
  function getInitialVolume() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('radio_volume');
      if (saved !== null) return parseFloat(saved);
    }
    return 0.5;
  }

  // Adicione estado para música atual e foto
  const [previousVolume, setPreviousVolume] = useState(volume);
  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setPreviousVolume(value[0]);
  };
  const toggleMute = () => {
    if (volume === 0) setVolume(previousVolume || 0.5);
    else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  // 1. useEffect para inicialização do objeto Audio e atualização da URL do stream
  useEffect(() => {
    // Atualiza a URL da fonte e carrega o stream apenas quando a estação muda
    // Não há mais um objeto Audio local para controlar a reprodução,
    // mas a lógica de reconexão e status ainda é relevante.
    // A lógica de reconexão agora é gerenciada pelo contexto.
  }, [radioStations[0].streamUrl, isPlaying, setIsPlaying]);

  // Função para tentar reconectar
  function tentarReconectar() {
    // A lógica de reconexão agora é gerenciada pelo contexto.
  }

  // 2. useEffect para controle de play/pause
  useEffect(() => {
    // A lógica de play/pause agora é gerenciada pelo contexto.
  }, [isPlaying, setIsPlaying]);

  // 3. useEffect para controle de volume
  useEffect(() => {
    // A lógica de volume agora é gerenciada pelo contexto.
  }, [volume]);

  // 4. useEffect de limpeza global
  useEffect(() => {
    return () => {
      // A lógica de limpeza global agora é gerenciada pelo contexto.
    };
  }, []);

  return (
    <Card className={cn("bg-white text-black p-4 rounded-xl shadow-lg border-0", className)}>
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-lg border-0 text-black hover:text-pink-500 transition-colors"
          aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
          <span className="sr-only">
            {isPlaying ? "Pause" : "Play"}
          </span>
        </Button>
        <div className="flex-1 min-w-0 bg-white rounded-lg overflow-x-hidden flex items-center gap-2">
          {/* Exibe a foto da música se houver */}
          {currentSongImage ? (
            <img src={currentSongImage} alt="Capa da música" className="w-12 h-12 rounded shadow border object-cover" />
          ) : (
            <img src="/images/RadioBraba.png" alt="Logo Rádio Braba" className="w-12 h-12 rounded shadow border object-cover" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold truncate text-black">Brabo FM</h3>
            <p className="text-xs text-pink-500 truncate font-medium">
              {currentSong ? `♪ Tocando agora: ${currentSong}` : '♪ Tocando agora: Ao vivo'}
            </p>
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
            aria-label={volume === 0 ? "Desmutar" : "Mutar"}
          >
            {volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
            <span className="sr-only">Mute</span>
          </Button>
          <div className="w-12 bg-gray-100 rounded-full p-1 shadow-inner">
            <Slider
              value={[volume]}
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