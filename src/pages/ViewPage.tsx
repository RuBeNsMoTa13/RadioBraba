import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Cloud, DollarSign, Lightbulb, Clock } from "lucide-react";
import { SupportsCarouselView } from '@/components/SupportsCarouselView';
import axios from "axios";
import DynamicInfo from '@/components/DynamicInfo/DynamicInfo';

export function ViewPage() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [time, setTime] = useState<string>("");

  // 🔹 Atualiza hora em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
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

        console.log("Informações completas da API:", apiInfo.data);
        console.log("Temperatura atual:", fetchedTemperature, "°C");

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

          {/* Coluna da Esquerda (Logo, Player rádio e Informações) */}

          {/* Parte Superior: Logo da Rádio */}
          <div className="bg-primary flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <img
                src="./public/images/RadioBrabaHero.png"

                alt="Logo da Radio Braba"
                className="w-[450px] h-[350px] object-contain rounded-lg"
              />
            </div>
            {/* Remova os <br /> extras e use gap para espaçamento controlado */}
            <div className="w-full p-12">
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
            {/* Parte Inferior: Informações */}
            <div className="z-50 bg-black/80 text-white rounded-xl shadow-lg p-4 flex gap-6 min-w-[220px]">
              <div className="flex items-center gap-2">
                <Cloud size={20} className="text-primary text-5xl w-12 h-12" />
                <span className='text-5xl font-semibold'>{temperature !== null ? `${temperature.toFixed(0)}°C` : "--°C"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-primary text-5xl w-12 h-12" />
                <span className='text-5xl font-semibold'>{time}</span>
              </div>
            </div>
          </div>


          {/* Colunas da Direita (Apoiadores e Curiosidades) */}
          <div className="col-span-2 flex flex-col">

            {/* Parte Superior: Apoiadores) */}
            <div className="h-1/2 flex items-center justify-center bg-gray-800 p-4">
              <div className="w-full">
                <h2 className="text-center text-white text-4xl font-bold mb-6">Apoie nosso comércio local!</h2>
                <SupportsCarouselView className="w-full" />
              </div>
            </div>

            {/* Parte Inferior: Curiosidades */}
            <div className="bg-gray-800 h-1/2 flex items-center justify-center p-4">
              <DynamicInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}