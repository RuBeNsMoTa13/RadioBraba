import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'; // Importar o plugin de Autoplay

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export type SupportsCarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type SupportsCarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: SupportsCarouselApi) => void;
};

type SupportsCarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & SupportsCarouselProps;

const SupportsCarouselContext = React.createContext<SupportsCarouselContextProps | null>(null);

function useSupportsCarousel() {
  const context = React.useContext(SupportsCarouselContext);

  if (!context) {
    throw new Error("useSupportsCarousel must be used within a <SupportsCarousel />");
  }

  return context;
}

export const SupportsCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SupportsCarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
        duration: 100, // Alterado de 40 para 100 para deixar mais lento
        loop: true, // Adicionado loop infinito
      },
      // Combinar plugins existentes com o plugin de Autoplay
      plugins ? [Autoplay({ delay: 5000, stopOnInteraction: false }), ...(Array.isArray(plugins) ? plugins : [plugins])] : [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: SupportsCarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    const listaDeApoiadores = [
      { name: "Apoiador 1", logo: "public/images/Apoiadores/Ifnc.png" },
      { name: "Apoiador 2", logo: "public/images/Apoiadores/ColegioObjetivo.png" },
      { name: "Apoiador 3", logo: "public/images/Apoiadores/Love.png" },
      { name: "Apoiador 4", logo: "public/images/Apoiadores/NaXinxa.png" },
      { name: "Apoiador 5", logo: "public/images/Apoiadores/NetCores.png" },
      { name: "Apoiador 6", logo: "public/images/Apoiadores/Panda.png" },
      { name: "Apoiador 7", logo: "public/images/logoChorme.png" },
      { name: "Apoiador 8", logo: "public/images/logoChorme.png" },
      { name: "Apoiador 9", logo: "public/images/logoChorme.png" },
      { name: "Apoiador 10", logo: "public/images/logoChorme.png" },
    ];

    return (
      <SupportsCarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <SupportsCarouselContent>
            {listaDeApoiadores.map((apoiador, index) => (
              <SupportsCarouselItem key={index}>
                <div className="flex items-center justify-center  border rounded-lg shadow-md "> {/* Adicionado estilos de card aqui */}
                  <img src={apoiador.logo} alt={apoiador.name} className="w-[200px] h-[100px] object-cover" /> {/* Alterado tamanho da imagem para 1000x500 */}
                </div>
              </SupportsCarouselItem>
            ))}
          </SupportsCarouselContent>
          <SupportsCarouselPrevious />
          <SupportsCarouselNext />
        </div>
      </SupportsCarouselContext.Provider>
    );
  }
);
SupportsCarousel.displayName = "SupportsCarousel";

const SupportsCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useSupportsCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
SupportsCarouselContent.displayName = "SupportsCarouselContent";

const SupportsCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useSupportsCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-1/3", // Changed from basis-full to basis-1/3
        // Removido padding condicional para colar os itens
        className
      )}
      {...props}
    />
  );
});
SupportsCarouselItem.displayName = "SupportsCarouselItem";

const SupportsCarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useSupportsCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-10", // Adicionado z-10 para garantir que fiquem acima do conteúdo
        orientation === "horizontal"
          ? "left-4 top-1/2 -translate-y-1/2" // Ajustado para dentro
          : "top-4 left-1/2 -translate-x-1/2 rotate-90", // Ajustado para dentro
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
SupportsCarouselPrevious.displayName = "SupportsCarouselPrevious";

const SupportsCarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useSupportsCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-10", // Adicionado z-10 para garantir que fiquem acima do conteúdo
        orientation === "horizontal"
          ? "right-4 top-1/2 -translate-y-1/2" // Ajustado para dentro
          : "bottom-4 left-1/2 -translate-x-1/2 rotate-90", // Ajustado para dentro
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
SupportsCarouselNext.displayName = "SupportsCarouselNext";
