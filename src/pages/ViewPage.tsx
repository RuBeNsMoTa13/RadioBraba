// src/pages/LiveDisplayPage.tsx
import React, { useState, useEffect } from 'react';
import { SupportsCarousel } from '@/components/SupportsCarousel';
import { RadioPlayerHero } from '@/components/RadioPlayerHero';
import Announcer from '@/components/Announcer/Announcer';
import DynamicInfo from '@/components/DynamicInfo/DynamicInfo';

export function ViewPage() {
  return (
    // Removendo NavBar e Footer via layout, e usando min-h-screen para preencher a tela
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]"> {/* Adjust h to account for page padding */}

        {/* Coluna da Esquerda (Apoiadores) */}
        <div className="lg:col-span-1 bg-card rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center">Nossos Apoiadores</h2>
          {/* O SupportsCarousel já vem com título, mas podemos reestilizá-lo */}
          <div className="w-full flex-1 flex items-center justify-center">
            <SupportsCarousel opts={{ loop: true, align: "center", duration: 100, dragFree: true }} />
          </div>
          {/* Se quiser adicionar outro carrossel de locutores aqui, para "encher" a coluna */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4 text-center">Conheça Nossos Locutores</h2>
          <div className="w-full h-96"> {/* Defina uma altura para o carrossel de locutores */}
             <Announcer />
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="lg:col-span-2 grid grid-rows-3 gap-6">

          {/* Linha 1: Player da Rádio (topo) */}
          <div className="row-span-1 bg-card rounded-xl shadow-lg p-4 flex items-center justify-center">
            <RadioPlayerHero className="w-full h-full flex flex-col items-center justify-center text-center" />
          </div>

          {/* Linha 2: Feed de Instagram */}
          <div className="row-span-1 bg-card rounded-xl shadow-lg p-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center">Nosso Instagram</h2>
            {/* O InstaFeed precisa de um div com id="instafeed" para renderizar */}
            <div className="w-full h-full flex items-center justify-center">
               {/* Habilitando OwlCarousel no InstaFeed.tsx é importante */}
               {/* Temporariamente comentando InstaFeed direto aqui, pois ele assume que o OwlCarousel está ativado e pode causar erros de renderização inicial se não estiver configurado corretamente no index.html e main.tsx para inicializar. No seu `InstaFeed.tsx` ele está comentado. */}
               {/* <InstaFeed /> */}
               <p className="text-gray-500 dark:text-gray-400">Conteúdo do Instagram virá aqui (verifique InstaFeed.tsx e dependências).</p>
            </div>
          </div>

          {/* Linha 3: Informações Dinâmicas (Cidade, Dólar, Temperatura, Fatos Curiosos) */}
          <div className="row-span-1 bg-card rounded-xl shadow-lg p-4 flex items-center justify-center">
            <DynamicInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
