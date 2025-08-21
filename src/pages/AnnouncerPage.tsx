import React, { useState, useEffect } from 'react';
import { locutoresData } from "@/lib/data";
import { Locutor } from "@/lib/types";
import { AnnouncerModal } from '@/components/Announcer/AnnouncerModal';
import { useLocation } from 'react-router-dom';


const AnnouncerPage: React.FC = () => {
  const [selectedLocutor, setSelectedLocutor] = useState<Locutor | null>(null);
  const location = useLocation();

  const openModal = (locutor: Locutor) => {
    setSelectedLocutor(locutor);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedLocutor(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#locutor-', '');
      const locutor = locutoresData.find(loc => loc.id === parseInt(id));
      if (locutor) {
        openModal(locutor);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-primary transition-colors duration-500">
      {/* Header Section */}
      <div className="px-6 py-4">
        <div className="text-center mb-10">
          {/* Títulos e subtítulos que mudam de cor */}
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary text-center">VOZES POR TRÁS DA RÁDIO</h2>
          <p className="text-xl text-secondary">E onde os feras da voz se encontram.</p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locutoresData.map((locutor) => (
              <div
                key={locutor.id}
                id={`locutor-${locutor.id}`}
                className="relative group cursor-pointer"
                onClick={() => openModal(locutor)}
              >
                
                {/* Card Content - Ajuste de cores para tema */}
                <div className="relative bg-card rounded-lg overflow-hidden h-96 group-hover:transform group-hover:scale-105 transition-transform duration-300 shadow-lg dark:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  
                  <img
                    src={locutor.foto}
                    alt={locutor.nome}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="mb-2">
                      {/* Cor do programa pode ser constante ou adaptável */}
                      <span className="rounded text-pink-400 font-medium">{locutor.programa}</span>
                    </div>
                    
                    {/* Título do locutor no card */}
                    <h3 className="text-xl font-bold mb-3 text-white">{locutor.nome}</h3>

                    <button className="border border-pink-400 text-pink-400 hover:bg-pink-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 text-sm font-medium">
                      VER DETALHES
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnnouncerModal locutor={selectedLocutor} onClose={closeModal} />
    </div>
  );
};

export default AnnouncerPage;