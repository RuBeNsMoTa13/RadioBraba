// src/components/SchedulePage/SchedulePage.tsx

import { useState } from "react";
import { showsData } from "@/lib/data";
import { Show } from "@/lib/types";
import { cn, getDayName } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Importações para o conteúdo do ShowCard que agora está embutido
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom"; // Assumindo que Link é do react-router-dom


export function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  // Gera os dias da semana, usando nomes abreviados para economizar espaço
  // Certifique-se que sua função getDayName em "@/lib/utils"
  // tenha o parâmetro 'abbreviated' e retorne a abreviação se 'true'.
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i), 
  }));

  const filteredShows = showsData.filter((show: Show) => show.day === selectedDay);

  return (
    <div className="page-container">
      <h1 className="page-title">Programação</h1>

      {/* Contêiner dos botões com scroll horizontal e responsividade */}
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
            // Conteúdo do ShowCard embutido diretamente aqui
            <div
              key={show.id} // Mantenha a chave aqui
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${show.image})` }}
              />
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