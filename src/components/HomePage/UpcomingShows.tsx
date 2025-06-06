import React from "react";
import { Button } from "@/components/ui/button";
import { Show } from "@/lib/types";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { showsData } from "@/lib/data";
import { getCurrentDaySchedule, getDayName } from "@/lib/utils";

export function UpcomingShows() {
  // Get today's schedule
  const todayShows = getCurrentDaySchedule(showsData).slice(0, 3);
  
  return (
    <section className="page-container">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="section-title">Programas de Hoje</h2>
        <Link to="/programacao" className="text-primary hover:underline">
          Ver Todos
        </Link>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {todayShows.length > 0 ? (
          todayShows.map((show: Show) => (
            <div
              key={show.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${show.image})` }} />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{show.title}</h3>
                <div className="flex flex-wrap gap-3 text-gray-500 mb-3 text-sm">
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
                <p className="text-gray-600 text-sm mb-4">{show.description}</p>
                <Link
                  to={`/programacao/${show.id}`}
                  className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-800 transition-colors"
                >
                  Saiba mais
                  <Calendar size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">
              Nenhum programa agendado para hoje.
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