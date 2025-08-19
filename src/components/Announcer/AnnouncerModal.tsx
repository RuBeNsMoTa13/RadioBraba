import { Locutor } from "@/lib/types";
import { X, Calendar, Users, Music, Instagram } from 'lucide-react';

interface AnnouncerModalProps {
  locutor: Locutor | null;
  onClose: () => void;
}

export function AnnouncerModal({ locutor, onClose }: AnnouncerModalProps) {
  if (!locutor) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[70] bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors text-white"
        >
          <X className="w-6 h-6" />
        </button>

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
            src={locutor.foto}
            alt={locutor.nome}
            className="w-full h-full object-cover relative z-10"
          />
        </div>

        <div className="md:w-1/2 p-8 overflow-y-auto text-gray-900 dark:text-gray-100">
          <div className="mb-4">
            <span className="bg-pink-600 text-xs px-3 py-1 rounded text-white font-medium">
              LOCUTOR
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">{locutor.nome}</h2>
          <p className="text-pink-600 text-lg mb-6">{locutor.programa}</p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {locutor.biografia}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-pink-600">Aniversário:</span>
              <span className="text-gray-600 dark:text-gray-300">{locutor.aniversario}</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-pink-600">Banda:</span>
              <span className="text-gray-600 dark:text-gray-300">{locutor.banda}</span>
            </div>

            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-pink-600">Música:</span>
              <span className="text-gray-600 dark:text-gray-300">{locutor.musica}</span>
            </div>

            {locutor.instagram && (
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-400" />
                <span className="font-semibold text-pink-600">Conecte-se</span>
                <a
                  href={`https://instagram.com/${locutor.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-400 transition-colors"
                >
                  {locutor.instagram}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}