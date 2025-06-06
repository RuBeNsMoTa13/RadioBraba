// src/components/SchedulePage/ShowCard.tsx
import React from "react";
import { Clock, User, Calendar } from "lucide-react";
import { getDayName } from "@/lib/utils";
import { Show } from "@/lib/types";

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary transition-transform duration-300 hover:scale-105 overflow-hidden">
      {/* Imagem do programa */}
      <div
        className="w-full h-40 bg-cover bg-center rounded-lg mb-4"
        style={{ backgroundImage: `url(${show.image})` }}
      />

      {/* Título */}
      <h3 className="text-2xl font-bold mb-2 text-primary">{show.title}</h3>

      {/* Informações: Host / Hora / Dia */}
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

      {/* Descrição */}
      <p className="text-muted-foreground text-sm mb-4">{show.description}</p>

      {/* Botão “Saiba Mais” sempre aparente */}
      <button className="w-full bg-[#E2E3E4] text-black font-medium py-2 rounded-lg transition-none">
        Saiba Mais
      </button>
    </div>
  );
}
