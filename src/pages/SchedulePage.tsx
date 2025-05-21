import React, { useState } from "react";
import { DayFilter } from "@/components/SchedulePage/DayFilter";
import { ShowCard } from "@/components/SchedulePage/ShowCard";
import { HostsSection } from "@/components/SchedulePage/HostsSection";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";

export function SchedulePage() {
  // State for active day filter (default to current day)
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  
  // Filter shows for active day
  const filteredShows = showsData.filter((show: Show) => show.day === activeDay);
  
  return (
    <div className="page-container">
      <h1 className="page-title">Programação</h1>
      
      <HostsSection />
      
      <div className="mb-8">
        <DayFilter activeDay={activeDay} onChange={setActiveDay} />
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