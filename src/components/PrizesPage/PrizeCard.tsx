import { Card, CardContent } from "@/components/ui/card";
import { Prize } from "@/lib/types";
import { BadgeAlert, Gift, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PrizeCardProps {
  prize: Prize;
  isPast: boolean;
  onOpenModal: (prize: Prize) => void;
}

export function PrizeCard({ prize, isPast, onOpenModal }: PrizeCardProps) {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    if (isPast) {
      setCountdown("Encerrado");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = prize.endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Encerrado");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [prize.endDate, isPast]);

  return (
    <Card className={cn(
        "bg-card rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 border-0",
        isPast && "opacity-60"
    )}>
      <div
        className="relative w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${prize.image})` }}
      >
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-card-foreground mb-2">{prize.title}</h3>
        <div className="flex flex-wrap gap-3 text-muted-foreground mb-3 text-sm">
          <div className="flex items-center">
            <BadgeAlert className={cn("h-4 w-4 mr-1", isPast ? "text-gray-500" : "text-primary")} />
            {isPast ? "Encerrado" : `Termina em ${countdown}`}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{prize.description}</p>
        <Button
          onClick={() => onOpenModal(prize)}
          className={cn(
              "inline-flex items-center text-primary text-sm font-medium bg-transparent",
              isPast ? "pointer-events-none text-gray-500" : "hover:text-pink-800"
          )}
        >
          {isPast ? "Saiba mais" : "Saiba mais"}
          <ExternalLink size={14} className="ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}