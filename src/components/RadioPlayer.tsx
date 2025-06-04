import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioState } from "@/lib/types";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { radioStations } from "@/lib/data";
import { cn } from "@/lib/utils";

export function RadioPlayer({ className }: { className?: string }) {
  const [radioState, setRadioState] = useState<RadioState>({
    isPlaying: false,
    volume: 0.8,
    station: radioStations[0],
  });

  const [currentSong, setCurrentSong] = useState(radioStations[0].currentSong);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio(radioState.station.streamUrl);
    audioRef.current.volume = radioState.volume;
    
    // In a real app, you would fetch current song info via API
    const songInterval = setInterval(() => {
      // This simulates getting updated song info
      const songNames = [
        "Cazuza - O Tempo Não Para",
        "Legião Urbana - Tempo Perdido",
        "Seu Jorge - Burguesinha",
        "Anitta - Envolver",
        "Caetano Veloso - Sozinho"
      ];
      const randomSong = songNames[Math.floor(Math.random() * songNames.length)];
      setCurrentSong(randomSong);
    }, 15000);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearInterval(songInterval);
    };
  }, [radioState.station.streamUrl]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (radioState.isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setRadioState(prev => ({...prev, isPlaying: false}));
      });
    } else {
      audioRef.current.pause();
    }
  }, [radioState.isPlaying]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = radioState.volume;
  }, [radioState.volume]);
  
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
    <Card className={cn("radio-player-bg text-white p-3 rounded-xl shadow-lg", className)}>
      <div className="flex items-center gap-4">
        <Button 
          onClick={togglePlay}
          variant="secondary" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30"
        >
          {radioState.isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
          <span className="sr-only">
            {radioState.isPlaying ? "Pause" : "Play"}
          </span>
        </Button>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{radioState.station.name}</h3>
          <p className="text-xs text-white/80 truncate animate-marquee">
            ♪ Tocando agora: {currentSong}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={toggleMute}
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            {radioState.volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span className="sr-only">Mute</span>
          </Button>
          
          <Slider
            value={[radioState.volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </Card>
  );
}