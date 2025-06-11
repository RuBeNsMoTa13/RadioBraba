// Tem que fazer logica de premios
import { Clock, User, Calendar, BadgeAlert, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { prizesData } from "@/lib/data";
import { getDayName } from "@/lib/utils";

export function PrizeSection() {
  // Calculate remaining days for each prize
  const calculateRemainingDays = (endDate: Date) => {
    const today = new Date();
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <section className="page-container">
      <div className="bg-card rounded-xl border shadow-sm p-8 mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-primary/10 rounded-full p-5">
            <Gift className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Prêmios e Promoções</h2>
            <p className="text-muted-foreground max-w-2xl">
              Participe de nossas promoções exclusivas e concorra a prêmios incríveis! 
              São ingressos para shows, kits exclusivos e muito mais.
            </p>
          </div>
          <Link
            to="/premios"
            className="font-semibold bg-white text-primary border-[1px] border-primary shadow-lg rounded-full px-6 py-2 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 text-black"
          >
            Ver Todos os Prêmios
          </Link>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {prizesData.map((prize) => (
          <div
            key={prize.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="w-full h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${prize.image})` }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{prize.title}</h3>
              <div className="flex flex-wrap gap-3 text-gray-500 mb-3 text-sm">
                <div className="flex items-center">
                  <BadgeAlert className="h-4 w-4 mr-1 text-primary" />
                  Termina em {Math.ceil(Math.abs(prize.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{prize.description}</p>
              <Link
                to={`/premios/${prize.id}`}
                className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-800 transition-colors"
              >
                Saiba mais
                <Gift size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}