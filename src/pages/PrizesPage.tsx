import { PrizeCard } from "@/components/PrizesPage/PrizeCard";
import { prizesData } from "@/lib/data";
import { Prize } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

export function PrizesPage() {
  return (
    <div className="page-container py-8">
      <h1 className="page-title text-3xl font-bold text-pink-600 mb-8">
        Prêmios e Promoções
      </h1>

      <Card className="mb-10 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-pink-100 rounded-full p-4 md:p-5">
            <Gift className="h-8 w-8 md:h-10 md:w-10 text-pink-600" />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
              Como Participar
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Participar é muito simples! Basta seguir nossa página nas redes sociais, compartilhar nosso conteúdo e preencher o formulário de inscrição disponível em cada promoção. Fique atento às nossas redes sociais e programação para mais informações.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {prizesData.map((prize: Prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </div>
    </div>
  );
}
