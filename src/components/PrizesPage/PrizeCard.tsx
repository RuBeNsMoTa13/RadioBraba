// src/components/PrizesPage/PrizeCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Prize } from "@/lib/types";
import { BadgeAlert, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface PrizeCardProps {
  prize: Prize;
}

export function PrizeCard({ prize }: PrizeCardProps) {
  // Calcula dias restantes até prize.endDate
  const today = new Date();
  const diffTime = Math.abs(prize.endDate.getTime() - today.getTime());
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-0">
      {/* Capa com imagem do prêmio */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${prize.image})` }}
      />

      <CardContent className="p-4">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{prize.title}</h3>

        {/* Badge com dias restantes */}
        <div className="flex flex-wrap gap-3 text-gray-500 mb-3 text-sm">
          <div className="flex items-center">
            <BadgeAlert className="h-4 w-4 mr-1 text-primary" />
            Termina em {daysRemaining} dias
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4">{prize.description}</p>

        {/* Link para detalhes */}
        <Link
          to={`/premios/${prize.id}`}
          className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-800 transition-colors"
        >
          Saiba mais
          <Gift size={14} className="ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
