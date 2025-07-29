import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Cloud, DollarSign, Lightbulb, Clock } from "lucide-react";

type DynamicInfoItem = {
  type: string;
  label: string;
  value: string | number;
  unit?: string;
  icon?: JSX.Element;
  source?: string;
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
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);



async function fetchWeather() {
        const apiKey = "321e647d854e73a9b6edd3e50bf77801"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=capela+do+alto&appid=${apiKey}&lang=pt_br&units=metric`;

        const apiInfo = await axios.get(url);
        setTemperature(apiInfo.data);

        const temperature = apiInfo.data.main.temp;
        console.log(apiInfo);
}
fetchWeather();

  // 🔹 Busca cotação do dólar
  useEffect(() => {
    const fetchDollar = async () => {
      try {
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const data = await res.json();
        setUsdRate(parseFloat(data.USDBRL.bid));
      } catch (error) {
        console.error("Erro ao buscar dólar:", error);
      }
    };
    fetchDollar();
  }, []);

  // 🔹 Lista dinâmica
  const infoItems: DynamicInfoItem[] = [
    { type: "city", label: "Localização", value: "Tatuí, SP", icon: <MapPin size={24} className="text-primary" /> },
    {
      type: "weather",
      label: "Temperatura",
      value: temperature !== null ? temperature.toFixed(1) : "--",
      unit: "°C",
      icon: <Cloud size={24} className="text-blue-400" />,
    },
    {
      type: "currency",
      label: "Dólar Comercial",
      value: usdRate !== null ? usdRate.toFixed(2) : "--",
      unit: "BRL",
      icon: <DollarSign size={24} className="text-green-500" />,
    },
    { type: "fact", label: "Curiosidade", value: "Tatuí é conhecida como a Capital da Música!", icon: <Lightbulb size={24} className="text-yellow-500" /> },
    {
      type: "time",
      label: "Horário Local",
      value: time,
      icon: <Clock size={24} className="text-purple-500" />,
    },
  ];

  // 🔹 Alterna item a cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infoItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [infoItems.length]);

  const currentInfo = infoItems[currentInfoIndex];

  return (
    <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-card rounded-xl shadow-lg p-4 transition-all duration-500">
      <div className="flex items-center justify-center text-center text-gray-800 dark:text-gray-100 mb-2">
        {currentInfo.icon && <span className="mr-3">{currentInfo.icon}</span>}
        <h3 className="text-xl sm:text-2xl font-bold">{currentInfo.label}</h3>
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-primary">
        {currentInfo.value}
        {currentInfo.unit && <span className="text-xl sm:text-2xl font-normal ml-2">{currentInfo.unit}</span>}
      </p>
      {currentInfo.source && <span className="text-xs text-gray-500 mt-1">{currentInfo.source}</span>}
    </div>
  );
}
