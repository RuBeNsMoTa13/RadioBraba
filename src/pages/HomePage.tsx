import { Hero } from "@/components/HomePage/Hero";
import { GalleryPreview } from "@/components/GalleryPage/GalleryPreview";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";
import News from "@/components/News/News";
import Announcer from "@/components/Announcer/Announcer";
import { SupportsCarousel } from "@/components/SupportsCarousel"; // Importando apenas o componente principal

export function HomePage() {
  return (
    <div >
      <Hero />
      <SupportsCarousel /> 
      <ScheduleSection />
      <Announcer />
      <PrizeSection />
      <News />
      <GalleryPreview />
    </div>
  );
}