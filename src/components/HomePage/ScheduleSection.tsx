import { useState } from "react";
import { Button } from "@/components/ui/button";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getDayName } from "@/lib/utils";

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const dayShows = showsData.filter((show) => show.day === selectedDay);

  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i),
  }));

  return (
    <section className="page-container bg-background py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-6 gap-2">
        <h2 className="section-title font-bold text-pink-600 text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight break-words">
          Programação da Semana
        </h2>
        <Link
          to="/programacao"
          className="font-semibold text-pink-600 underline-offset-4 decoration-pink-400 transition-all duration-300 hover:text-pink-900 hover:underline hover:scale-105 text-base xs:text-lg"
        >
          Ver Programação Completa
        </Link>
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-8 p-2 custom-scrollbar">
        {days.map((day) => (
          <Button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            variant={selectedDay === day.value ? "default" : "outline"}
            className={cn(
              "rounded-full bg-background text-pink-600 border-2 border-pink-600 shadow-lg font-semibold transition-all duration-300 hover:bg-pink-300 hover:text-white hover:scale-105",
              "shrink-0",
              "px-3 py-1 text-xs",
              "sm:px-4 sm:py-1 sm:text-sm",
              "md:px-6 md:py-2 md:text-base",
              selectedDay === day.value && "bg-pink-500 text-white border-pink-600"
            )}
          >
            {day.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dayShows.map((show: Show) => (
          <div
            key={show.id}
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${show.image})` }} />
            <div className="p-4">
              <h3 className="text-lg font-bold text-primary mb-2">{show.title}</h3>
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
        ))}

        {dayShows.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">Nenhum programa agendado para este dia.</p>
            <Link
              to="/programacao"
              className="mt-4 inline-block font-semibold text-pink-600 underline-offset-4 decoration-pink-400 transition-all duration-300 hover:text-pink-800 hover:underline hover:scale-105"
            >
              Ver Programação Completa
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}