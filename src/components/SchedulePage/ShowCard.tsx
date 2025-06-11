// src/components/SchedulePage/ShowCard.tsx
import React from "react";
import { Clock, User, Calendar } from "lucide-react";
import { getDayName } from "@/lib/utils";
import { Show } from "@/lib/types";
import { Link } from "react-router-dom";

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
  );
}
