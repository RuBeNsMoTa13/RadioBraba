import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { Prize } from "@/lib/types";

interface PrizeCardProps {
  prize: Prize;
}

export function PrizeCard({ prize }: PrizeCardProps) {
  // Calculate remaining days
  const calculateRemainingDays = (endDate: Date) => {
    const today = new Date();
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const remainingDays = calculateRemainingDays(prize.endDate);
  
  // Calculate percentage for progress bar (assuming max 90 days)
  const initialDays = 90;
  const progress = Math.max(0, Math.min(100, ((initialDays - remainingDays) / initialDays) * 100));
  
  return (
    <Card className="card-hover flex flex-col h-full">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={prize.image}
            alt={prize.title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <CardTitle className="text-xl mb-2">{prize.title}</CardTitle>
        <CardDescription className="mb-4">
          {prize.description}
        </CardDescription>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>Encerra em:</span>
            </div>
            <span className="font-medium">{remainingDays} dias</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Participar Agora</Button>
      </CardFooter>
    </Card>
  );
}