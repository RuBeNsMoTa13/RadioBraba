import { useState } from "react";
import { Button } from "@/components/ui/button";
import { showsData, locutoresData } from "@/lib/data";
import { Show, Locutor } from "@/lib/types";
import { Clock, User, Calendar, X, Users as UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getDayName } from "@/lib/utils";
import { AnnouncerModal } from "@/components/Announcer/AnnouncerModal";

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedAnnouncer, setSelectedAnnouncer] = useState<Locutor | null>(null);

  const dayShows = showsData.filter((show) => show.day === selectedDay);

  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i),
  }));

  const openShowModal = (show: Show) => {
    setSelectedShow(show);
    document.body.style.overflow = 'hidden';
  };

  const closeShowModal = () => {
    setSelectedShow(null);
    document.body.style.overflow = '';
  };
  
  const openAnnouncerModal = (locutor: Locutor) => {
    setSelectedAnnouncer(locutor);
    document.body.style.overflow = 'hidden';
  };

  const closeAnnouncerModal = () => {
    setSelectedAnnouncer(null);
    document.body.style.overflow = '';
  };

  const selectedShowHost = selectedShow
    ? locutoresData.find(locutor => locutor.nome === selectedShow.host)
    : null;

  return (
    <section className="page-container bg-background py-8">
      <div className=" sm:flex-row sm:justify-between sm:items-baseline mb-6 gap-2">
        <div className="px-6 pt-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary text-center">PROGRAMAÇÃO DA SEMANA</h2>
            <p className="text-xl text-secondary">Sintonize com nós todos os dias.</p>
          </div>
          <Link
            to="/programacao"
            className="font-semibold text-pink-600 underline-offset-4 decoration-pink-400 transition-all duration-300 hover:text-pink-900 hover:underline hover:scale-105 text-base xs:text-lg"
          >
            Ver Programação Completa
          </Link>
        </div>
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-8 p-2 custom-scrollbar">
        {days.map((day) => (
          <Button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            variant={selectedDay === day.value ? "default" : "outline"}
            className={cn(
              "rounded-full bg-card text-pink-600 border-2 border-pink-600 shadow-lg font-semibold transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-105",
              "shrink-0", 
              "px-3 py-1 text-xs", 
              "sm:px-4 sm:py-1 sm:text-sm", 
              "md:px-6 md:py-2 md:text-base",

              selectedDay === day.value && "bg-pink-300 text-white border-pink-300"
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
            <div className="w-full aspect-[16/9] flex items-center justify-center bg-gray-100">
              <img
                src={show.image}
                alt={show.title}
                className="max-h-full bg-contain"
              />
            </div>
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
              <Button
                onClick={() => openShowModal(show)}
                className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-800 transition-colors"
                variant="link"
              >
                Saiba mais
                <Calendar size={14} className="ml-1" />
              </Button>
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

      {/* Modal de programa */}
      {selectedShow && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
            <button
              onClick={closeShowModal}
              className="absolute top-4 right-4 z-[70] bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="md:w-1/2 relative">
              <img
                src={selectedShow.image}
                alt={selectedShow.title}
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            <div className="md:w-1/2 p-8 overflow-y-auto text-card-foreground">
              <h2 className="text-3xl font-bold mb-2 text-primary">{selectedShow.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">{selectedShow.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary text-xl">Apresentador:</span>
                  <span className="text-muted-foreground text-xl">{selectedShow.host}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary text-xl">Horário:</span>
                  <span className="text-muted-foreground text-xl">{selectedShow.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary text-xl">Dia:</span>
                  <span className="text-muted-foreground text-xl">{getDayName(selectedShow.day)}</span>
                </div>

                {selectedShowHost && (
                  <Button
                    onClick={() => {
                        closeShowModal();
                        openAnnouncerModal(selectedShowHost);
                    }}
                    className="w-full md:w-auto mt-6 bg-primary text-white hover:bg-pink-500"
                  >
                    <UsersIcon size={16} className="mr-2" />
                    Ver perfil de {selectedShow.host}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Apresentador */}
      <AnnouncerModal locutor={selectedAnnouncer} onClose={closeAnnouncerModal} />
    </section>
  );
}