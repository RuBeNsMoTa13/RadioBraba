import { useState } from "react";
import { ShowCard } from "@/components/SchedulePage/ShowCard";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";
import { cn, getDayName } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i),
  }));
  const filteredShows = showsData.filter((show: Show) => show.day === selectedDay);

  return (
    <div className="page-container">
      <h1 className="page-title">Programação</h1>


      <div className="flex flex-wrap gap-2 mb-8">
        {days.map((day) => (
          <Button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            variant={selectedDay === day.value ? "default" : "outline"}
            className={cn(
              "rounded-full bg-white text-pink-600 border-2 border-pink-600 shadow-lg px-6 py-2 font-semibold transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-105",
              selectedDay === day.value && "bg-pink-300 text-white border-pink-300"
            )}
          >
            {day.label}
          </Button>
        ))}
      </div>

      {filteredShows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShows.map((show: Show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            Nenhum programa agendado para este dia.
          </p>
        </div>
      )}
    </div>
  );
}
