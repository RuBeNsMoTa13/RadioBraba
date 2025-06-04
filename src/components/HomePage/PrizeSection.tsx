import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BadgeAlert, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { prizesData } from "@/lib/data";

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
          
          <Button asChild size="lg">
            <Link to="/premios">Ver Todos os Prêmios</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {prizesData.map((prize) => {
          const remainingDays = calculateRemainingDays(prize.endDate);
          
          return (
            <Card key={prize.id} className="card-hover">
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={prize.image}
                    alt={prize.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </AspectRatio>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-xl mb-2">{prize.title}</CardTitle>
                <CardDescription className="mb-4">
                  {prize.description}
                </CardDescription>
                <div className="flex items-center text-sm">
                  <BadgeAlert className="h-4 w-4 mr-1 text-primary" />
                  <span className="font-medium">
                    Termina em {remainingDays} dias
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/premios">
                    Participar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}