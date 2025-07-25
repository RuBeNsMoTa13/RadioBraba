import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { radioStations } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useRadioPlayer } from "@/context/RadioPlayerContext";

export function RadioPlayerHero({ className }: { className?: string }) {
  const { isPlaying, setIsPlaying, volume, setVolume, currentSong, currentSongImage, status } = useRadioPlayer();
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
  return (
    <div className={cn(
      "bg-white text-black px-6 py-4 rounded-xl shadow-2xl border-0 flex flex-col items-center  w-full", // padding menor e largura máxima reduzida
      className
    )}>
      {currentSongImage ? (
        <img src={currentSongImage} alt="Capa da música" className="rounded-lg shadow border object-cover mb-3 w-48 h-48" />
      ) : (
        <img src="/images/RadioBraba.png" alt="Logo Rádio Braba" className="rounded-xl shadow border-4 object-cover mb-3 w-48 h-48" />
      )}
      <h3 className="font-bold text-lg text-center mb-1 truncate w-full">Brabo FM</h3>
      <p className="text-pink-500 text-base font-medium text-center mb-2 truncate w-full">
        {currentSong ? `♪ Tocando agora: ${currentSong}` : '♪ Tocando agora: Ao vivo'}
      </p>
      {status === 'connecting' && <span className="text-xs text-yellow-600 mb-2">Conectando...</span>}
      {status === 'error' && <span className="text-xs text-red-600 mb-2">Erro ao conectar. Tentando novamente...</span>}
      <div className="flex flex-col items-center w-full justify-center mt-2 gap-3">
        <Button
          onClick={togglePlay}
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 shadow-lg border-2 text-black hover:text-pink-500 transition-colors"
          aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </Button>
        <div className="flex items-center gap-2 mt-2">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-black hover:text-pink-500 hover:bg-gray-100 transition-colors rounded-full"
            aria-label={volume === 0 ? "Desmutar" : "Mutar"}
          >
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="sr-only">Mute</span>
          </Button>
          <div className="w-40 bg-gray-100 rounded-full p-1 shadow-inner">
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
    </div>
  );
}