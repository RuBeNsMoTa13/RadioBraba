import { PrizeCard } from "@/components/PrizesPage/PrizeCard";
import { prizesData} from "@/lib/data";
import { Prize} from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PrizesPage() {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const openModal = (prize: Prize) => {
    setSelectedPrize(prize);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPrize(null);
    document.body.style.overflow = '';
  };
  
  const today = new Date();
  const activePrizes = prizesData.filter((prize) => prize.endDate > today);
  const pastPrizes = prizesData.filter((prize) => prize.endDate <= today);

  return (
    <div className="page-container py-8 bg-background">
      <h1 className="page-title text-3xl md:text-4xl font-bold text-primary mb-8">
        Prêmios e Promoções
      </h1>

      <Card className="mb-10 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-border dark:border-border">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-primary/10 rounded-full p-4 md:p-5">
            <Gift className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
              Como Participar
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Participar é muito simples! Basta seguir nossa página nas redes sociais, compartilhar nosso conteúdo e preencher o formulário de inscrição disponível em cada promoção. Fique atento às nossas redes sociais e programação para mais informações.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Prêmios Ativos */}
      {activePrizes.length > 0 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Prêmios Ativos</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {activePrizes.map((prize: Prize) => (
              <PrizeCard key={prize.id} prize={prize} isPast={false} onOpenModal={openModal} />
            ))}
          </div>
        </>
      )}

      {/* Seção de Prêmios Anteriores */}
      {pastPrizes.length > 0 && (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Prêmios Anteriores</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {pastPrizes.map((prize: Prize) => (
              <PrizeCard key={prize.id} prize={prize} isPast={true} onOpenModal={openModal} />
            ))}
          </div>
        </>
      )}

      {/* Modal do Prêmio */}
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
    </div>
  );
}