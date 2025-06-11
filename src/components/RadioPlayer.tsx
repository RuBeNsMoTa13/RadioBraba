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
            ♪ Tocando agora: {currentSong}
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