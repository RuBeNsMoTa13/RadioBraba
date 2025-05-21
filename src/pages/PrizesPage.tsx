import React from "react";
import { PrizeCard } from "@/components/PrizesPage/PrizeCard";
import { prizesData } from "@/lib/data";
import { Prize } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

export function PrizesPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Prêmios e Promoções</h1>
      
      <Card className="mb-10">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="bg-primary/10 rounded-full p-4 md:p-5">
              <Gift className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Como Participar</h2>
              <p className="text-muted-foreground max-w-3xl">
                Participar é muito simples! Basta seguir nossa página nas redes sociais, 
                compartilhar nosso conteúdo e preencher o formulário de inscrição disponível 
                em cada promoção. Fique atento às nossas redes sociais e programação para mais informações.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {prizesData.map((prize: Prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </div>
    </div>
  );
}