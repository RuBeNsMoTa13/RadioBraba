import { Button } from "@/components/ui/button";
import { RadioPlayer } from "@/components/RadioPlayer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-cover bg-center py-16 md:py-24" 
         style={{ 
          backgroundColor: "#1a202c", // Fallback color
           backgroundSize: "cover",
           backgroundPosition: "center"
         }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/80"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Rádio Brasil FM
            <span className="block text-rose-950">Música para sua vida</span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-xl max-w-lg">
            Transmitindo o melhor da música brasileira e internacional 24 horas por dia.
            Conecte-se à melhor experiência musical do Brasil.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="font-semibold bg-white text-primary border-[1px]1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-black"
            >
              <Link to="/programacao">
                Ver Programação
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="font-semibold bg-white text-primary border-[1px]1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-black"
            >
              <Link to="/premios">
                Prêmios e Sorteios
                                <ArrowRight className="ml-2 h-4 w-4" />

              </Link>
            </Button>
          </div>
          
          <div className="mt-8 max-w-md">
            <RadioPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}