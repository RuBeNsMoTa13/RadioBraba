import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Cloud, Clock } from "lucide-react";
import { SupportsCarouselView } from '@/components/SupportsCarouselView';
import axios from "axios";
import { RadioPlayerHero } from '@/components/RadioPlayerHero';
import CuriosityInfo from '@/components/CuriosityInfo/CuriosityInfo';

export function ViewPage() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [time, setTime] = useState<string>("");
  // NOVO: Estado para alternar entre as imagens do QR Code
  const [qrCodeImage, setQrCodeImage] = useState("/images/Apoiadores/QRcodeFollow.png");
  const qrCodeImages = ["/images/Apoiadores/QRcodeFollow.png", "/images/Apoiadores/QRcodeListen.png"];

  // 🔹 Atualiza hora em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // NOVO: Efeito para alternar entre as imagens do QR Code
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index = (index + 1) % qrCodeImages.length;
      setQrCodeImage(qrCodeImages[index]);
    }, 5000); // Altera a imagem a cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  // 🔹 Busca dados do clima usando API OpenWeather
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "321e647d854e73a9b6edd3e50bf77801";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=capela+do+alto&appid=${apiKey}&lang=pt_br&units=metric`;

      try {
        const apiInfo = await axios.get(url);
        const fetchedTemperature = apiInfo.data.main.temp;
        setTemperature(fetchedTemperature);
      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        setTemperature(null);
      }
    };
    fetchWeather();
  }, []);
  
  const navigate = useNavigate();
  const [showExitButton, setShowExitButton] = useState(false);
  const exitButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback(() => {
    setShowExitButton(true);
    if (exitButtonTimeoutRef.current) {
      clearTimeout(exitButtonTimeoutRef.current);
    }
    exitButtonTimeoutRef.current = setTimeout(() => {
      setShowExitButton(false);
    }, 500);
  }, []);

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
      <div className="fixed inset-0 z-50 flex-col items-center justify-center bg-black/90 text-white text-center p-8 block md:hidden">
        <h2 className="text-2xl font-bold mb-4">Página indisponível para dispositivos móveis</h2>
        <p className="text-lg">Acesse pelo computador para uma melhor experiência.</p>
        <p className="text-lg">Desculpe o transtorno, nossa equipe está trabalhando para a melhor experiência.</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">

          {/* Coluna da Esquerda (reorganizada) */}
          <div className="bg-primary flex flex-col justify-between items-center h-full p-4">

 {/* 1. Previsão do Tempo no topo */}
<div className="flex flex-col items-center justify-center mb-6"> {/* ADICIONADO: mb-6 para espaçamento na parte de baixo */}
    {/* CORREÇÃO: Removido min-w- e alterado tamanho das fontes para responsividade */}
    <div className="z-50 bg-white/70 text-gray-800 rounded-xl p-2 flex gap-4 w-full max-w-sm">
        <div className="flex items-center gap-2">
            <Cloud size={20} className="text-primary w-8 h-8 md:w-10 md:h-10" />
            <span className='text-lg md:text-xl lg:text-3xl font-semibold'>{temperature !== null ? `${temperature.toFixed(0)}°C` : "--°C"}</span>
        </div>
        <div className="flex items-center gap-2">
            <Clock size={20} className="text-primary w-8 h-8 md:w-10 md:h-10" />
            <span className='text-lg md:text-xl lg:text-3xl font-semibold'>{time}</span>
        </div>
    </div>
</div>

            {/* 2. Player no meio */}
            <div className="w-full h-full flex justify-center items-center">
               <RadioPlayerHero/>
            </div>
            
            {/* 3. Imagem do QR Code no final */}
            <div className="flex flex-col items-center">
                <img 
                    src={qrCodeImage} // Usa o estado para a imagem
                    alt="QR Code" 
                    className="w-full object-cover rounded-lg" 
                />
            </div>

          </div>


          {/* Colunas da Direita (reorganizada, com os apoiadores ocupando o espaço) */}
          <div className="col-span-2 flex flex-col">

            {/* Parte Superior: Apoiadores) */}
            <div className="h-1/2 flex items-center justify-center bg-gray-800 p-4">
              <div className="w-full">
                <h2 className="text-center text-white text-4xl font-bold mb-6">Apoio cultural!</h2>
                <SupportsCarouselView className="w-full" />
              </div>
            </div>

            {/* Parte Inferior: DynamicInfo, agora no lado direito */}
            <div className="bg-gray-800 h-1/2 flex items-center justify-center p-12 ">
              <CuriosityInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}