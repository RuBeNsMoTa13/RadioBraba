import React, { useState } from 'react';
import { locutoresData } from "@/lib/data";
import { Locutor } from "@/lib/types";
import { X, Calendar, Users, Music, Instagram } from 'lucide-react';


const AnnouncerPage: React.FC = () => {
  const [selectedLocutor, setSelectedLocutor] = useState<Locutor | null>(null);

  const openModal = (locutor: Locutor) => {
    setSelectedLocutor(locutor);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedLocutor(null);
    document.body.style.overflow = '';
  };

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
      {selectedLocutor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
            {/* Close Button - Ajuste de cores para tema */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[70] bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section (sem mudança de tema nas cores aqui, pois é imagem) */}
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 opacity-20">
                <div className="flex flex-wrap gap-2 p-2">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      // Padrão de bolinhas no modal, se precisar de dark mode, ajuste aqui
                      className="w-12 h-12 rounded-full border border-red-500 flex items-center justify-center"
                    >
                    </div>
                  ))}
                </div>
              </div>
              
              <img
                src={selectedLocutor.foto}
                alt={selectedLocutor.nome}
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Content Section - Ajuste de cores para tema */}
            <div className="md:w-1/2 p-8 overflow-y-auto text-gray-900 dark:text-gray-100">
              <div className="mb-4">
                <span className="bg-pink-600 text-xs px-3 py-1 rounded text-white font-medium">
                  LOCUTOR
                </span>
              </div>

              {/* Título do locutor no modal */}
              <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">{selectedLocutor.nome}</h2>
              {/* Cor do programa pode ser constante ou adaptável */}
              <p className="text-pink-600 text-lg mb-6">{selectedLocutor.programa}</p>

              {/* Biografia do locutor */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {selectedLocutor.biografia}
              </p>

              {/* Detalhes do locutor com ícones */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Aniversário:</span>
                  <span className="text-gray-600 dark:text-gray-300">{selectedLocutor.aniversario}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Banda:</span>
                  <span className="text-gray-600 dark:text-gray-300">{selectedLocutor.banda}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Música:</span>
                  <span className="text-gray-600 dark:text-gray-300">{selectedLocutor.musica}</span>
                </div>

                {selectedLocutor.instagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-400" />
                    <span className="font-semibold text-pink-600">Conecte-se</span>
                    <a
                      href={`https://instagram.com/${selectedLocutor.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-pink-400 transition-colors"
                    >
                      {selectedLocutor.instagram}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncerPage;