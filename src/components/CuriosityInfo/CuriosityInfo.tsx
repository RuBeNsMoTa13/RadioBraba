import { useEffect, useState } from "react";
import { infoItemsData } from "@/lib/data";

export default function CuriosityInfo() {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  // 🔹 Alterna item a cada 15s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infoItemsData.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [infoItemsData.length]);

  const currentInfo = infoItemsData[currentInfoIndex];

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