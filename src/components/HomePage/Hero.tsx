import { Button } from "@/components/ui/button";
import { RadioPlayer } from "@/components/RadioPlayer"; // Mantido caso ainda seja usado em outro lugar
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// import { useState } from "react"; // Não é mais necessário
// import { RadioPlayerHero } from "@/components/RadioPlayerHero"; // Não é mais necessário

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
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Bloco do Título e Span - Ordem 1 no mobile, Ordem 1 no desktop */}
                    <div className="w-full md:w-1/2 text-white text-center md:text-left order-1 md:order-1">
                        <div className="w-full flex flex-col items-center justify-center gap-8 mr-0 md:mr-12">
                            <img
                                src="./public/images/RadioBrabaHero.png"
                                alt="Logo da Radio Braba"
                                className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Bloco do IFRAME (Player da Rádio) - Ordem 2 no mobile, Ordem 2 no desktop (coluna direita) */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center items-center order-2 md:order-2">
                        {/* O IFRAME agora é responsivo: */}
                        <iframe
                            src="https://player.xcast.com.br/player-icast/9186"
                            frameBorder="0"
                            // Removemos width="428" e height="444" fixos
                            // Em vez disso, usamos classes e estilo para responsividade:
                            className="w-full rounded-lg shadow-xl" // w-full faz ele ocupar 100% da largura do pai
                            style={{
                                aspectRatio: '428 / 444', // Mantém a proporção original (largura / altura)
                                maxWidth: '428px', // Garante que não fique maior que as dimensões originais em telas grandes
                                height: 'auto', // Ajusta a altura automaticamente com base na largura e aspect-ratio
                                margin: '0 auto' // Centraliza o iframe dentro do seu contêiner
                            }}
                            allow="autoplay"
                        ></iframe>
                    </div>

                    {/* Bloco do Parágrafo, Botões e Player - Ordem 3 no mobile, Ordem 1 no desktop */}
                    <div className="w-full md:w-1/2 text-white text-center md:text-left order-3 md:order-1">
                        <p className="mt-4 text-lg sm:text-xl max-w-lg mx-auto md:mx-0">
                            Transmitindo o melhor da música brasileira e internacional 24 horas por dia.
                            Conecte-se à melhor experiência musical do Brasil.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="font-semibold bg-card text-black border-[1px] border-primary shadow-lg rounded-full px-6 py-2 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 dark:text-primary"
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
                                className="font-semibold bg-card text-black border-[1px] border-primary shadow-lg rounded-full px-6 py-2 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 dark:text-primary"
                            >
                                <Link to="/exibicao">
                                    Modo Exibição
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}