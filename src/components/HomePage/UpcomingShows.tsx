import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Show } from "@/lib/types";
import { Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { showsData } from "@/lib/data";
import { getCurrentDaySchedule } from "@/lib/utils";

export function UpcomingShows() {
  // Get today's schedule
  const todayShows = getCurrentDaySchedule(showsData).slice(0, 3);
  
  return (
    <section className="page-container">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="section-title">Programas de Hoje</h2>
        <Link to="/programacao" className="text-primary hover:underline">
          Ver Todos
        </Link>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {todayShows.length > 0 ? (
          todayShows.map((show: Show) => (
            <Card key={show.id} className="card-hover">
              <CardHeader className="p-0">
                <div 
                  className="h-48 w-full bg-cover bg-center rounded-t-lg" 
                  style={{ backgroundImage: `url(${show.image})` }}
                />
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-xl font-bold mb-2">
                  {show.title}
                </CardTitle>
                <div className="flex items-center text-muted-foreground mb-2">
                  <User className="h-4 w-4 mr-1" /> {show.host}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" /> {show.time}
                </div>
                <p className="mt-3 text-sm">{show.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/programacao`}>
                    Mais Detalhes
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">
              Nenhum programa agendado para hoje.
            </p>
            <Button asChild className="mt-4">
              <Link to="/programacao">
                Ver Programação Completa
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}