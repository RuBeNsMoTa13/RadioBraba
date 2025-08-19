import { PrizeCard } from "@/components/PrizesPage/PrizeCard";
import { prizesData } from "@/lib/data";
import { Prize } from "@/lib/types";
import { Gift, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";


export function PrizeSection() {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  // Lógica para filtrar apenas os prêmios ativos
  const today = new Date();
  const activePrizes = prizesData.filter((prize) => prize.endDate > today);

  const openModal = (prize: Prize) => {
    setSelectedPrize(prize);
  };

  const closeModal = () => {
    setSelectedPrize(null);
    document.body.style.overflow = '';
  };

  return (
    <section className="page-container">
      <div className="px-6 py-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Prêmios e Promoções</h2>
          <p className="text-xl text-secondary">Participe de nossas promoções exclusivas e concorra a prêmios incríveis! São ingressos para shows, kits exclusivos e muito mais.</p>
        </div>
        
      </div>
      {activePrizes.length > 0 && (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {activePrizes.map((prize: Prize) => (
              <PrizeCard key={prize.id} prize={prize} isPast={false} onOpenModal={openModal} />
            ))}
          </div>
        </>
      )}

      {selectedPrize && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[70] bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="md:w-1/2 relative">
              <img
                src={selectedPrize.image}
                alt={selectedPrize.title}
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            <div className="md:w-1/2 p-8 overflow-y-auto text-card-foreground">
              <div className="mb-4">
                <span className="bg-primary text-xs px-3 py-1 rounded text-primary-foreground font-medium">
                  PRÊMIO
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-2 text-primary">{selectedPrize.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">{selectedPrize.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Status:</span>
                  <span className={cn("text-muted-foreground", selectedPrize.endDate <= today ? "text-gray-500" : "text-primary")}>
                    {selectedPrize.endDate <= today ? "Encerrado" : `Ativo até ${selectedPrize.endDate.toLocaleDateString()}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Link
          to="/premios"
          className="font-semibold bg-card text-primary border-[1px] border-primary shadow-lg rounded-full px-6 py-2 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 text-black"
        >
          Ver Todos os Prêmios
        </Link>
      </div>
    </section>
  );
}