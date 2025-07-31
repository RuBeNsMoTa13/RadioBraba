import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Cloud, DollarSign, Lightbulb, Clock } from "lucide-react";

type DynamicInfoItem = {
  type: string;
  label: string;
  value: string | number | null;
  unit?: string;
  icon?: JSX.Element;
  source?: string;
  image?: string; // Caminho da imagem (opcional)
};

export default function DynamicInfo() {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [usdRate, setUsdRate] = useState<number | null>(null);
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
        setTemperature(null); // Set to null on error
      }
    };

    fetchWeather();
  }, []);

  // 🔹 Busca cotação do dólar
  useEffect(() => {
    const fetchDollar = async () => {
      try {
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const data = await res.json();
        setUsdRate(parseFloat(data.USDBRL.bid));
      } catch (error) {
        console.error("Erro ao buscar dólar:", error);
        setUsdRate(null);
      }
    };
    fetchDollar();
    const interval = setInterval(fetchDollar, 600000); // Atualiza a cada 10 minutos
    return () => clearInterval(interval);
  }, []);

  // 🔹 Lista dinâmica (agora só curiosidades)
  const infoItems: DynamicInfoItem[] = [
    {
      type: "fact",
      label: "Curiosidade",
      value: "Sabia que o nome 'Capela do Alto' não foi à toa? A galera da beira do Rio Sarapuí já falava 'bora pra capela do alto' pra ir na capelinha lá no ponto mais alto.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Quase que a cidade tinha uns nomes como 'Cruz do Monge' ou 'Guarapiranga'! Rolou uma eleição apertada, e 'Capela do Alto' ganhou por só 5 votos.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Capela do Alto fica bem localizada, na Região Metropolitana de Sorocaba, tipo um pedacinho importante do mapa paulista.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    // {
    //   type: "weather",
    //   label: "Temperatura",
    //   value: temperature !== null ? temperature.toFixed(0) : "--",
    //   unit: "°C",
    //   icon: <Cloud size={24} className="text-blue-400" />,
    // },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Reza a lenda que um crime triplo rolou por lá, e por isso foram erguidas três cruzes. Meio macabro, né?",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Depois das três cruzes, um monge 'misterioso' do Ipanema apareceu e colocou mais onze, totalizando 14! Elas eram usadas pra Via Sacra na Quaresma até 1960.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "O tal monge do Ipanema tinha uns poderes especiais, dizem! O lugar onde ele morava e a pedra onde ele dormia viraram quase pontos turísticos de tão visitados.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "A cidade se deu bem porque a estrada São Paulo-Paraná, que ligava Sorocaba a Itapetininga passou por ali e virou a rua principal do pedaço.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Em 1950, a cidade ganhou seu próprio Distrito Policial. A lei chegou pra ficar!",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Quatro anos depois, em 1954, criaram o Distrito de Paz, e o primeiro chefe foi o Sr. Heleno Lopes Plens.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "E esse mesmo Heleno Lopes Plens, que era o chefe do Distrito de Paz, se tornou o primeiro Prefeito de Capela do Alto.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "A cidade só conseguiu ser 'independente' em 26 de março de 1965. Antes, ela era tipo 'filha' de Araçoiaba da Serra.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "Curiosidade",
      value: "Um grande dia foi 20 de junho de 1954, quando a energia elétrica chegou no então distrito.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/FelipeBranco.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Gersinho.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Fred.png",
    },
  ];

  // 🔹 Alterna item a cada 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infoItems.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [infoItems.length]);

  const currentInfo = infoItems[currentInfoIndex];

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center w-full h-full bg-[#00060A] rounded-xl p-4 transition-all duration-500 overflow-hidden"
      >
        {/* Imagem de fundo, se existir */}
        {currentInfo.image && (
          <img
            src={currentInfo.image}
            alt={currentInfo.label}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 0 }}
          />
        )}
        {/* Conteúdo sobreposto */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center text-center text-gray-100 mb-2">
            {currentInfo.icon && <span className="mr-3">{currentInfo.icon}</span>}
            <h3 className="text-2xl sm:text-2xl font-bold">{currentInfo.label}</h3>
          </div>
          <p className="text-base sm:text-xl md:text-2xl font-normal text-primary text-center max-w-md mx-auto">
            {currentInfo.value}
            {currentInfo.unit && <span className="text-xl sm:text-2xl font-normal ml-2">{currentInfo.unit}</span>}
          </p>
          {currentInfo.source && <span className="text-xs text-gray-500 mt-1">{currentInfo.source}</span>}
        </div>
      </div>
      {/* Nova div fixa no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-50 bg-black/80 text-white rounded-xl shadow-lg p-4 flex flex-row gap-6 min-w-[220px]">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-primary" />
          <span>Capela do Alto, SP</span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud size={20} className="text-blue-400" />
          <span>{temperature !== null ? `${temperature.toFixed(0)}°C` : "--°C"}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={20} className="text-green-500" />
          <span>{usdRate !== null ? `R$ ${usdRate.toFixed(2)}` : "--"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-purple-500" />
          <span>{time}</span>
        </div>
      </div>
    </>
  );
}