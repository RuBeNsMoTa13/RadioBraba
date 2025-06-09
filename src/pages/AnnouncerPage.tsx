import React, { useState } from 'react';
import { X, Calendar, Users, Music, Instagram } from 'lucide-react';
import Announcer from '@/components/Announcer/Announcer';

interface Locutor {
  id: number;
  nome: string;
  programa: string;
  foto: string;
  biografia: string;
  aniversario: string;
  banda: string;
  musica: string;
  instagram?: string;
}

// Expandindo a lista para ter 18 locutores (3x6)
const locutores: Locutor[] = [
  {
    id: 1,
    nome: "Rodrigo Branco",
    programa: "Folguista",
    foto: "/api/placeholder/300/400",
    biografia: "Locutor experiente com mais de 10 anos de rádio, conhecido por seu humor único e energia contagiante.",
    aniversario: "15/07",
    banda: "Metallica, Iron Maiden",
    musica: "Master of Puppets (Metallica)",
    instagram: "@rodrigobranco_radio"
  },
  {
    id: 2,
    nome: "Walter Ricci",
    programa: "Folguista",
    foto: "/api/placeholder/300/400",
    biografia: "Veterano do rádio com paixão por rock clássico e histórias incríveis para contar.",
    aniversario: "22/11",
    banda: "Pink Floyd, The Beatles",
    musica: "Wish You Were Here (Pink Floyd)",
    instagram: "@walterricci_fm"
  },
  {
    id: 3,
    nome: "Titio Marco Antonio Abreu",
    programa: "Alternativa Kiss",
    foto: "/api/placeholder/300/400",
    biografia: "Comecei em rádio com 17 anos, lendo notícias numa emissora AM do litoral Paulista. Passei por diversas emissoras, mas foi na Kiss que o \"Titio\" nasceu. Esse personagem se confunde com a história da própria emissora, da qual faço parte há quase 22 anos. É uma história de amor que marcou e continuará marcando minha vida para sempre",
    aniversario: "14/03",
    banda: "Black Sabbath, Ozzy e Led Zeppelin",
    musica: "No More Tears (OZZY)",
    instagram: "@titio_kiss"
  },
  {
    id: 4,
    nome: "Rosângela Santos",
    programa: "Kiss Manhã",
    foto: "/api/placeholder/300/400",
    biografia: "Apresentadora carismática que desperta a cidade com energia e boa música todas as manhãs.",
    aniversario: "08/04",
    banda: "Queen, Bon Jovi",
    musica: "Don't Stop Me Now (Queen)",
    instagram: "@rosangela_kiss"
  },
  {
    id: 5,
    nome: "Bruno Sutter",
    programa: "Bem que se KISS",
    foto: "/api/placeholder/300/400",
    biografia: "Apresentador com vasta experiência em programas de rock, sempre trazendo as melhores seleções musicais.",
    aniversario: "12/09",
    banda: "AC/DC, Rush",
    musica: "Highway to Hell (AC/DC)",
    instagram: "@bruno_sutter"
  },
  {
    id: 6,
    nome: "Pamella Luciene",
    programa: "Na Pista Com a Kiss",
    foto: "/api/placeholder/300/400",
    biografia: "Locutora especializada em música eletrônica e dance, com um ouvido apurado para os hits da pista.",
    aniversario: "28/06",
    banda: "Daft Punk, The Chemical Brothers",
    musica: "One More Time (Daft Punk)",
    instagram: "@pamella_luciene"
  },
  {
    id: 7,
    nome: "Henry do Carmo",
    programa: "RockCast",
    foto: "/api/placeholder/300/400",
    biografia: "Veterano do rock com mais de 15 anos de experiência, especialista em bandas nacionais e internacionais.",
    aniversario: "03/12",
    banda: "Pearl Jam, Soundgarden",
    musica: "Alive (Pearl Jam)",
    instagram: "@henry_carmo"
  },
  {
    id: 8,
    nome: "Vitão Bonesso",
    programa: "Backstage",
    foto: "/api/placeholder/300/400",
    biografia: "Apresentador que traz os bastidores do mundo da música, com entrevistas exclusivas e novidades.",
    aniversario: "17/01",
    banda: "Foo Fighters, Red Hot Chili Peppers",
    musica: "Everlong (Foo Fighters)",
    instagram: "@vitao_bonesso"
  },
  {
    id: 9,
    nome: "Marcos Chapeleta",
    programa: "Mundo Geek",
    foto: "/api/placeholder/300/400",
    biografia: "O nerd da rádio que conecta música e cultura pop, sempre com as últimas novidades do universo geek.",
    aniversario: "25/05",
    banda: "Linkin Park, System of a Down",
    musica: "In the End (Linkin Park)",
    instagram: "@chapeleta_geek"
  },
  {
    id: 10,
    nome: "Vany Américo",
    programa: "Wake Up",
    foto: "/api/placeholder/300/400",
    biografia: "A voz que desperta São Paulo, trazendo energia e bom humor para começar bem o dia.",
    aniversario: "14/08",
    banda: "The Killers, Arctic Monkeys",
    musica: "Mr. Brightside (The Killers)",
    instagram: "@vany_americo"
  },
  {
    id: 11,
    nome: "Alexandre Gomes",
    programa: "As 10 da Kiss",
    foto: "/api/placeholder/300/400",
    biografia: "Apresenta o ranking semanal com as músicas mais pedidas pelos ouvintes da Kiss FM.",
    aniversario: "07/10",
    banda: "Muse, Radiohead",
    musica: "Bohemian Rhapsody (Queen)",
    instagram: "@alex_gomes_radio"
  },
  {
    id: 12,
    nome: "Renata Aranha",
    programa: "Na Pista Com a Kiss",
    foto: "/api/placeholder/300/400",
    biografia: "Co-apresentadora especializada em música dance e eletrônica, sempre antenada nas tendências.",
    aniversario: "19/03",
    banda: "Calvin Harris, David Guetta",
    musica: "Titanium (David Guetta)",
    instagram: "@renata_aranha"
  },
  {
    id: 13,
    nome: "Carlos Mendes",
    programa: "Rock Nacional",
    foto: "/api/placeholder/300/400",
    biografia: "Especialista em rock brasileiro, promovendo bandas nacionais e a cultura musical do país.",
    aniversario: "11/02",
    banda: "Legião Urbana, Barão Vermelho",
    musica: "Tempo Perdido (Legião Urbana)",
    instagram: "@carlos_mendes_rock"
  },
  {
    id: 14,
    nome: "Marina Costa",
    programa: "Alternativa Kiss",
    foto: "/api/placeholder/300/400",
    biografia: "Apresentadora que explora sons alternativos e indie, sempre descobrindo novos talentos.",
    aniversario: "23/09",
    banda: "Arcade Fire, Vampire Weekend",
    musica: "Wake Up (Arcade Fire)",
    instagram: "@marina_costa_alt"
  },
  {
    id: 15,
    nome: "Rafael Storm",
    programa: "Metal Zone",
    foto: "/api/placeholder/300/400",
    biografia: "O headbanger da casa, especializado em heavy metal e todas as suas vertentes.",
    aniversario: "06/11",
    banda: "Iron Maiden, Judas Priest",
    musica: "The Number of the Beast (Iron Maiden)",
    instagram: "@rafael_storm"
  },
  {
    id: 16,
    nome: "Luana Beats",
    programa: "Electronic Vibes",
    foto: "/api/placeholder/300/400",
    biografia: "DJ e apresentadora focada em música eletrônica, house e techno de qualidade.",
    aniversario: "18/07",
    banda: "Deadmau5, Swedish House Mafia",
    musica: "Strobe (Deadmau5)",
    instagram: "@luana_beats"
  },
  {
    id: 17,
    nome: "Pedro Rockeiro",
    programa: "Classic Rock",
    foto: "/api/placeholder/300/400",
    biografia: "Guardião dos clássicos do rock, mantendo viva a memória dos grandes sucessos.",
    aniversario: "30/04",
    banda: "Led Zeppelin, Deep Purple",
    musica: "Stairway to Heaven (Led Zeppelin)",
    instagram: "@pedro_rockeiro"
  },
  {
    id: 18,
    nome: "Júlia Indie",
    programa: "Indie Sessions",
    foto: "/api/placeholder/300/400",
    biografia: "Curadora musical especializada em indie rock e bandas emergentes do cenário alternativo.",
    aniversario: "09/12",
    banda: "The Strokes, Franz Ferdinand",
    musica: "Last Nite (The Strokes)",
    instagram: "@julia_indie"
  }
];

const AnnouncerPage: React.FC = () => {
  const [selectedLocutor, setSelectedLocutor] = useState<Locutor | null>(null);

  const openModal = (locutor: Locutor) => {
    setSelectedLocutor(locutor);
  };

  const closeModal = () => {
    setSelectedLocutor(null);
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Header */}
      <div className="bg-red-600 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            VOZES POR TRÁS <span className="italic">DA RÁDIO</span>
          </h1>
          <p className="text-center mt-4 text-lg opacity-90">
            Conheça toda nossa equipe de locutores e apresentadores
          </p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locutores.map((locutor) => (
            <div
              key={locutor.id}
              className="relative group cursor-pointer"
              onClick={() => openModal(locutor)}
            >
              {/* Kiss FM Logo Background Pattern */}
              <div className="absolute inset-0 opacity-5 z-0">
                <div className="flex flex-wrap gap-2 p-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border border-red-500 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold">92.5<br/>KISS<br/>FM</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden h-96 group-hover:transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                
                <img
                  src={locutor.foto}
                  alt={locutor.nome}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="mb-2">
                    <span className="bg-red-600 text-xs px-3 py-1 rounded text-white font-medium">
                      🎵 {locutor.programa}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{locutor.nome}</h3>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-colors duration-300 text-sm font-medium w-full">
                      VER DETALHES
                    </button>
                  </div>
                </div>

                {/* Kiss FM Logo */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold z-20 opacity-80">
                  92.5<br/>KISS<br/>FM
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedLocutor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 opacity-20">
                <div className="flex flex-wrap gap-2 p-2">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border border-red-500 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold">92.5<br/>KISS<br/>FM</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <img
                src={selectedLocutor.foto}
                alt={selectedLocutor.nome}
                className="w-full h-full object-cover relative z-10"
              />

              {/* Kiss FM Logo */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold z-20">
                92.5<br/>KISS<br/>FM
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 overflow-y-auto">
              <div className="mb-4">
                <span className="bg-red-600 text-xs px-3 py-1 rounded text-white font-medium">
                  LOCUTOR
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-2">{selectedLocutor.nome}</h2>
              <p className="text-red-400 text-lg mb-6">{selectedLocutor.programa}</p>

              <p className="text-gray-300 leading-relaxed mb-8">
                {selectedLocutor.biografia}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span className="font-semibold">Aniversário:</span>
                  <span className="text-gray-300">{selectedLocutor.aniversario}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-400" />
                  <span className="font-semibold">Banda:</span>
                  <span className="text-gray-300">{selectedLocutor.banda}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-red-400" />
                  <span className="font-semibold">Música:</span>
                  <span className="text-gray-300">{selectedLocutor.musica}</span>
                </div>

                {selectedLocutor.instagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-red-400" />
                    <span className="font-semibold">Conecte-se</span>
                    <a
                      href={`https://instagram.com/${selectedLocutor.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {selectedLocutor.instagram}
                    </a>
                  </div>
                )}
              </div>

              {/* Kiss FM Logo Bottom */}
              <div className="mt-8 flex justify-end">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                  92.5<br/>KISS<br/>FM
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncerPage;