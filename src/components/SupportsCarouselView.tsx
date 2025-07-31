// src/components/SupportsCarouselView.tsx
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SupportsCarouselView({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      axis: "x",
      loop: true,
      duration: 100,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const listaDeApoiadores = [
    { name: "Apoiador 1", logo: "/images/Apoiadores/1.png" },
    { name: "Apoiador 2", logo: "/images/Apoiadores/2.png" },
    { name: "Apoiador 3", logo: "/images/Apoiadores/3.png" },
    { name: "Apoiador 4", logo: "/images/Apoiadores/4.png" },
    { name: "Apoiador 5", logo: "/images/Apoiadores/5.png" },
    { name: "Apoiador 6", logo: "/images/Apoiadores/6.png" },
    { name: "Apoiador 7", logo: "/images/Apoiadores/7.png" },
    { name: "Apoiador 8", logo: "/images/Apoiadores/8.png" },
    { name: "Apoiador 9", logo: "/images/Apoiadores/9.png" },
    { name: "Apoiador 10", logo: "/images/Apoiadores/10.png" },
    { name: "Apoiador 11", logo: "/images/Apoiadores/11.png" },
    { name: "Apoiador 12", logo: "/images/Apoiadores/12.png" },
    { name: "Apoiador 13", logo: "/images/Apoiadores/13.png" },
    { name: "Apoiador 14", logo: "/images/Apoiadores/14.png" },
    { name: "Apoiador 15", logo: "/images/Apoiadores/15.png" },
    { name: "Apoiador 16", logo: "/images/Apoiadores/16.png" },
  ];

  return (
    <div
      className={cn("relative w-full", className)}
      role="region"
      aria-roledescription="carousel"
    >        

      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex gap-x-4">
          {listaDeApoiadores.map((apoiador, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/3 flex justify-center"
            >
              <img
                src={apoiador.logo}
                alt={apoiador.name}
                className="w-[300px] h-[300px] object-contain rounded-lg shadow-lg p-4"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botão anterior */}
      {/* <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full border-primary hover:bg-primary/20"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button> */}

      {/* Botão próximo */}
      {/* <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full border-primary hover:bg-primary/20"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button> */}
    </div>
  );
}
