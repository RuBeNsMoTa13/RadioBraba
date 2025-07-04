import { Button } from "@/components/ui/button";
import { RadioPlayer } from "@/components/RadioPlayer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-cover bg-center py-16 md:py-24"
             style={{
             backgroundColor: "#1a202c",
               backgroundSize: "cover",
               backgroundPosition: "center"
             }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent/80"></div>

      <div className="container relative z-10 mx-auto px-4">

        {/* Contêiner flexível principal com gap-8 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8"> {/* Mantido gap-8 */}

            {/* Bloco do Título e Span - Ordem 1 no mobile, Ordem 1 no desktop */}
            {/* No desktop, este bloco e o próximo (Parágrafo/Botões/Player) formarão a coluna esquerda */}
            <div className="w-full md:w-1/2 text-white text-center md:text-left order-1 md:order-1"> {/* order-1 para mobile, md:order-1 para desktop */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
                    Rádio Braba FM
                    <span className="block text-emphasis">Música para sua vida</span>
                </h1>
            </div>

            {/* Bloco do GIF - Ordem 2 no mobile, Ordem 2 no desktop (coluna direita) */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center cursor-pointer order-2 md:order-2"> {/* order-2 para mobile, md:order-2 para desktop */}
                <img
                    className="w-full max-w-sm md:max-w-none rounded-lg shadow-xl"
                    src="/images/videohero.gif"
                    alt="Animação de destaque da Rádio Braba"
                />
            </div>

            {/* Bloco do Parágrafo, Botões e Player - Ordem 3 no mobile, Ordem 1 no desktop */}
            {/* No desktop, este bloco e o anterior (Título/Span) formarão a coluna esquerda */}
             <div className="w-full md:w-1/2 text-white text-center md:text-left order-3 md:order-1"> {/* order-3 para mobile, md:order-1 para desktop */}
                <p className="mt-4 text-lg sm:text-xl max-w-lg mx-auto md:mx-0">
                    Transmitindo o melhor da música brasileira e internacional 24 horas por dia.
                    Conecte-se à melhor experiência musical do Brasil.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button
                        asChild
                        size="lg"
                        className="font-semibold bg-white text-primary border-[1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-black"
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
                        className="font-semibold bg-white text-primary border-[1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-black"
                    >
                        <Link to="/premios">
                            Prêmios e Sorteios
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 max-w-md mx-auto md:mx-0">
                    
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}