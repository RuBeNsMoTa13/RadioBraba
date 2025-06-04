import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Show } from "@/lib/types";
import { Clock, User, Calendar } from "lucide-react";
import { cn, getDayName } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <Card className={cn("card-hover flex flex-col h-full")}>
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={show.image}
            alt={show.title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <h3 className="text-xl font-bold mb-2">{show.title}</h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-1" /> {getDayName(show.day)}
        </div>
        <div className="flex items-center text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" /> {show.time}
        </div>
        <div className="flex items-center text-muted-foreground mb-3">
          <User className="h-4 w-4 mr-1" /> {show.host}
        </div>
        <p className="text-sm">{show.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Mais Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}