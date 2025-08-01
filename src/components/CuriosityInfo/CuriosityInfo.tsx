import { useEffect, useState } from "react";

type CuriosityInfoItem = {
  type: string;
  label: string;
  value: string | number | null;
  unit?: string;
  icon?: JSX.Element;
  source?: string;
  image?: string;
};

export default function CuriosityInfo() {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  // 🔹 Lista dinâmica 
  const infoItems: CuriosityInfoItem[] = [
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/1.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/2.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/3.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/4.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/5.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/6.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/7.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/8.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/9.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/10.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/11.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/12.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/13.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/14.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/15.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/16.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/17.png",
    },
    {
      type: "fact",
      label: "",
      value: null,
      image: "/images/Curiosidades/18.png",
    },

  ];

  // 🔹 Alterna item a cada 15s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infoItems.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [infoItems.length]);

  const currentInfo = infoItems[currentInfoIndex];

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center w-full h-full bg-gray-800 rounded-xl p-4 transition-all duration-500 overflow-hidden"
      >
        {/* Imagem de fundo*/}
        {currentInfo.image && (
          <img
            src={currentInfo.image}
            alt={currentInfo.label}
            className="absolute inset-0 w-full h-full   object-cover object-center"
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
    </>
  );
}