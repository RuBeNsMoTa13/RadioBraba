import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { SupportsCarouselView } from '@/components/SupportsCarouselView'; // Seu carrossel de apoiadores
import DynamicInfo from '@/components/DynamicInfo/DynamicInfo';

export function ViewPage() {
  const navigate = useNavigate();
  const [showExitButton, setShowExitButton] = useState(false);
  const exitButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para lidar com o movimento do mouse
  const handleMouseMove = useCallback(() => {
    setShowExitButton(true);
    if (exitButtonTimeoutRef.current) {
      clearTimeout(exitButtonTimeoutRef.current);
    }
    exitButtonTimeoutRef.current = setTimeout(() => {
      setShowExitButton(false);
    }, 500);
  }, []);

  // Efeito para adicionar e remover listeners de movimento do mouse
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (exitButtonTimeoutRef.current) {
        clearTimeout(exitButtonTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Mensagem para mobile */}
      <div className="fixed inset-0 z-50 flex-col items-center justify-center bg-black/90 text-white text-center p-8 block md:hidden">
        <h2 className="text-2xl font-bold mb-4">Página indisponível para dispositivos móveis</h2>
        <p className="text-lg">Acesse pelo computador para uma melhor experiência.</p>
        <p className="text-lg">Desculpe o transtorno, nossa equipe está trabalhando para melhorar a experiência.</p>
        <button
          onClick={() => navigate('/')}
          className="w-[120px] h-[80px] mt-4 px-4 py-2 bg-primary text-black rounded font-bold"
        >
          Voltar
        </button>
      </div>
      <div
        className="relative flex h-screen w-screen bg-card-foreground overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Botão de Saída (X) */}
        <button
          onClick={() => navigate('/')}
          className={`fixed top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 transition-opacity duration-300 ${showExitButton ? 'opacity-100' : 'opacity-0'
            }`}
          aria-label="Voltar para a página inicial"
        >
          <div className="flex items-center gap-2">
            <X size={24} />
            <h4>Voltar para a página inicial</h4>
          </div>
        </button>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">

          {/* Coluna da Esquerda (Player rádio) */}
          <div className="bg-primary flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <h6 className="text-white text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Rádio Braba FM
                <span className="block text-emphasis">104,9 FM</span>
              </h6>
              <img
                src="./public/images/RadioBraba.png"
                alt="Logo da Radio Braba"
                className="w-[300px] h-[300px] object-contain rounded-lg"
              />
            </div>
            <div className="w-full mb-24">
              {/* Embed do player de rádio */}
              <iframe
                src="https://player.xcast.com.br/player-icast/9186"
                frameBorder="0"
                className="w-full rounded-lg"
                style={{
                  aspectRatio: '428 / 444',
                  maxWidth: '428px',
                  height: 'auto',
                  margin: '0 auto'
                }}
                allow="autoplay"
              ></iframe>
            </div>
          </div>


          {/* Colunas da Direita (Apoiadores e Info Dinâmica) */}
          <div className="col-span-2 flex flex-col">

            {/* Parte Superior: Apoiadores) */}
            <div className="h-1/2 flex items-center justify-center bg-gray-800 p-4">
              <div className="w-full">
                <h2 className="text-center text-white text-4xl font-bold">Apoie nosso comércio local!</h2>
                <SupportsCarouselView className="w-full" /> {/* Ajuste a largura máxima conforme necessário */}
              </div>
            </div>

            {/* Parte Inferior: Informações Dinâmicas */}
            <div className="h-1/2 flex items-center justify-center p-4">
              <DynamicInfo />
              <div className="flex flex-col items-center justify-center text-center text-white">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}