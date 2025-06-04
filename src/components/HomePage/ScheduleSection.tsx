import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getDayName } from "@/lib/utils";

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  
  // Get shows for the selected day
  const dayShows = showsData.filter((show) => show.day === selectedDay);
  
  // Create array of days for the filter
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i)
  }));

  return (
    <section className="page-container bg-card border-y">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="section-title">Programação da Semana</h2>
        <Link to="/programacao" className="text-primary hover:underline">
          Ver Programação Completa
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {days.map((day) => (
          <Button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            variant={selectedDay === day.value ? "default" : "outline"}
            className={cn(
              "rounded-full",
              selectedDay === day.value && "bg-primary text-white"
            )}
          >
            {day.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {dayShows.map((show: Show) => (
          <Card key={show.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div 
                  className="w-full md:w-48 h-32 bg-cover bg-center rounded-lg" 
                  style={{ backgroundImage: `url(${show.image})` }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" /> {show.host}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {show.time}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> {getDayName(show.day)}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{show.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {dayShows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum programa agendado para este dia.
            </p>
            <Button asChild className="mt-4">
              <Link to="/programacao">
                Ver Programação Completa
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}