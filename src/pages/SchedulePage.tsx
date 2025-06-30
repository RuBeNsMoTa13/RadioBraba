import { useState } from "react";
import { ShowCard } from "@/components/SchedulePage/ShowCard";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";
import { cn, getDayName } from "@/lib/utils"; // Certifique-se de que getDayName está configurado para abreviações
import { Button } from "@/components/ui/button";

export function SchedulePage() {
  // Pega o dia atual (0 = Domingo, 1 = Segunda, etc.)
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  // Gera os dias da semana, usando nomes abreviados para economizar espaço
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i),
  }));

  // Filtra os programas com base no dia selecionado
  const filteredShows = showsData.filter((show: Show) => show.day === selectedDay);

  return (
    <div className="page-container">
      <h1 className="page-title">Programação</h1>

      {/* Contêiner dos botões com scroll horizontal para telas pequenas */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-8 p-2 custom-scrollbar">
        {days.map((day) => (
          <Button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            variant={selectedDay === day.value ? "default" : "outline"}
            className={cn(
              // Estilos base para todos os tamanhos (mobile first)
              "rounded-full bg-white text-pink-600 border-2 border-pink-600 shadow-lg font-semibold transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-105",
              "shrink-0", // Impede que os botões encolham no scroll horizontal

              // Estilos responsivos de padding e fonte (diminuem em telas menores)
              "px-3 py-1 text-xs", // Muito pequeno (extra small screens)
              "sm:px-4 sm:py-1 sm:text-sm", // Pequeno (small screens)
              "md:px-6 md:py-2 md:text-base", // Médio (medium screens) - o tamanho original

              // Estilo para o botão selecionado
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