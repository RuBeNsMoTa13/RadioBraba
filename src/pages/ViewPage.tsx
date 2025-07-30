import { SupportsCarousel } from '@/components/SupportsCarousel';
import { RadioPlayerHero } from '@/components/RadioPlayerHero';
import DynamicInfo from '@/components/DynamicInfo/DynamicInfo';

export function ViewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]"> {/* Adjust h to account for page padding */}

        {/* Coluna da Esquerda (Apoiadores) */}
        <div className="lg:col-span-1 bg-card rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center">Nossos Apoiadores</h2>
          <div className="w-full flex-1 flex items-center justify-center">
            <SupportsCarousel opts={{ loop: true, align: "center", duration: 100, dragFree: true }} />
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="lg:col-span-2 grid grid-rows-3 gap-6">

          {/* Linha 1: Player da Rádio (topo) */}
          <div className="row-span-1 bg-card rounded-xl shadow-lg p-4 flex items-center justify-center">
            <RadioPlayerHero className="w-full h-full flex flex-col items-center justify-center text-center" />
          </div>

          {/* Linha 2: Informações Dinâmicas (Cidade, Dólar, Temperatura, Fatos Curiosos) */}
          <div className="row-span-1 bg-card rounded-xl shadow-lg p-4 flex items-center justify-center">
            <DynamicInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
