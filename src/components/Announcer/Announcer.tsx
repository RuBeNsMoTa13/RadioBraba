import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, Users, Music, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const locutores: Locutor[] = [
  {
    id: 1,
    nome: "Lais Moraes",
    programa: "",
    foto: "./images/LaisMoraes.png",
    biografia: "Iniciou a locução aos 14 anos na rádio comunitária Capela Fm e em eventos como o Baile da Rainha de Capela do Alto. Amante da música e cantora nas horas vagas.",
    aniversario: "18/12",
    banda: "Evanescence / Miley Cyrus",
    musica: "Good Enough - Amy Lee",
    instagram: "@laismoraesv"
  },
  {
    id: 2,
    nome: "Marco Nissani",
    programa: "",
    foto: "./images/MarcoNissani.png",
    biografia: "Piloto de avião, técnico de ar condicionado e radialista.",
    aniversario: "19/12",
    banda: "Victor e Leo / Barão Vermelho",
    musica: "Chuva de bruxaria - Victor e Leo",
    instagram: "@marco_nissani"
  },
  {
    id: 3,
    nome: "Paulinho do Povo",
    programa: "",
    foto: "./images/PaulinhoPovo.png",
    biografia: "Amo rádio, apaixonado por modas sertanejas, clássicos, universitários, vanerão gaúcho.",
    aniversario: "19/02",
    banda: "Gino & Geno",
    musica: "Agita Aí - Gino & Geno",
    instagram: "@paulinhodopovo104.9"
  },
  {
    id: 4,
    nome: "Felipe Branco",
    programa: "",
    foto: "./images/FelipeBranco.png",
    biografia: " Comediante stand-up e roteirista, da zueira porque sabe que a vida é importante demais pra ser levada a sério",
    aniversario: "26/09",
    banda: "Guns, Mamonas Assassinas",
    musica: "Lá vem o Alemão - Mamonas Assassinas",
    instagram: "@felipebrancostandup"
  },
  {
    id: 5,
    nome: "Toninho",
    programa: "",
    foto: "./images/Toninho.png",
    biografia: "Locutor e radialista desde 2008, criador do programa 'Obrigado ao homem do campo', pois o homem, a mulher e seus filhos produzem o alimento que abastecem nossas mesas todos os dias, faça sol, faça chuva e enobrecem nosso país.",
    aniversario: "30/08",
    banda: "Pink Floyd / Trio Parada Dura / Zé Neto e Cristiano",
    musica: "Obrigado ao Homem do Campo - Dom & Ravel",
    instagram: "@terra.tecnica"
  },
  {
    id: 6,
    nome: "Grídia Maria",
    programa: "",
    foto: "./images/GrídiaMaria.png",
    biografia: "Orgulhosamente do interior, onde a vida é mais calma, os vizinhos são amigos e o café é sempre fresquinho.",
    aniversario: "27/08",
    banda: "Nhana e Cascantinha, Chitãozinho e Xororó, Padre Marcelo Rossi",
    musica: "Meu primeiro amor (Nhana e Cascantinha)",
    instagram: "@gridia.maria"
  },
  {
    id: 7,
    nome: "Sérgio Gées",
    programa: "",
    foto: "./images/SergioGoes.png",
    biografia: "Comerciante e músico apaixonado por musica, sempre com uma história para contar.",
    aniversario: "08/03",
    banda: "Beatles / Deep Purple / Ultraje a Rigor",
    musica: "For Whom the Bell Tolls - Metallica",
    instagram: "@serggiogoes"
  },
  {
    id: 8,
    nome: "Fred",
    programa: "",
    foto: "./images/Fred.png",
    biografia: "Busco ver possibilidades onde os outros veem obstáculos. Uso minha criatividade não só pra inovar, mas também encontrar soluções únicas aos problemas comuns do nosso cotidiano.",
    aniversario: "23/11",
    banda: "Charlie Brown Jr. / Supertramp / SOJA",
    musica: "Bob Dylan - Hurricane",
    instagram: "@fredericolc"
  }
];

const Announcer: React.FC = () => {
  const [selectedLocutor, setSelectedLocutor] = useState<Locutor | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, locutores.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, locutores.length - 2)) % Math.max(1, locutores.length - 2));
  };

  const openModal = (locutor: Locutor) => {
    setSelectedLocutor(locutor);
  };

  const closeModal = () => {
    setSelectedLocutor(null);
  };

  return (
    <div className="min-h-screen text-white page-container mx-auto">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">VOZES POR TRÁS DA RÁDIO</h2>
          <p className="text-xl text-secondary">E onde os feras da voz se encontram.</p>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="relative px-6 py-8">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`
            }}
          >
            {locutores.map((locutor) => (
              <div
                key={locutor.id}
                className="flex-shrink-0 w-full md:w-1/3 relative group cursor-pointer"
                onClick={() => openModal(locutor)}
              >
                {/* Kiss FM Logo Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="flex flex-wrap gap-4 p-4">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center"
                      >
                        <span className="text-xs font-bold">92.5<br/>KISS<br/>FM</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden h-96 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  
                  <img
                    src={locutor.foto}
                    alt={locutor.nome}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="mb-2">
                      <span className="rounded text-pink-400 font-medium">{locutor.programa}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{locutor.nome}</h3>

                    <button className="border border-pink-400 text-pink-400 hover:bg-accent hover:text-white px-4 py-2 rounded transition-colors duration-300 text-sm font-medium">
                      VER DETALHES
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Novo botão ao final do carrossel */}
        <div className="flex justify-center mt-8">
          <Button 
                asChild
                size="lg"
                className="font-semibold bg-primary text-primary border-[1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-foreground">
                <Link to="/locutores" className="">Ver Locutores Completo</Link>
          </Button>
        </div>
      </div>
      {/* Modal */}
      {selectedLocutor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
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

            {/* Content Section */}
            <div className="md:w-1/2 p-8 overflow-y-auto">
              <div className="mb-4">
                <span className="bg-pink-600 text-xs px-3 py-1 rounded text-white font-medium">
                  LOCUTOR
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-2 text-black">{selectedLocutor.nome}</h2>
              <p className="text-pink-600 text-lg mb-6">{selectedLocutor.programa}</p>

              <p className="text-gray-600 leading-relaxed mb-8">
                {selectedLocutor.biografia}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Aniversário:</span>
                  <span className="text-gray-600">{selectedLocutor.aniversario}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Banda:</span>
                  <span className="text-gray-600">{selectedLocutor.banda}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold text-pink-600">Música:</span>
                  <span className="text-gray-600">{selectedLocutor.musica}</span>
                </div>

                {selectedLocutor.instagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-400" />
                    <span className="font-semibold text-pink-600">Conecte-se</span>
                    <a
                      href={`https://instagram.com/${selectedLocutor.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-400 transition-colors"
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

export default Announcer;