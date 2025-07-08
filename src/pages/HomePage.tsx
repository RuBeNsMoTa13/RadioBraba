import { Hero } from "@/components/HomePage/Hero";
import { GalleryPreview } from "@/components/GalleryPage/GalleryPreview";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";
import Announcer from "@/components/Announcer/Announcer";
import { SupportsCarousel } from "@/components/SupportsCarousel"; // Importando apenas o componente principal
import VideoGallery from "@/components/YoutubeAPI/VideoGallery"; 

export function HomePage() {
  return (
    <div >
      <Hero />
      <SupportsCarousel /> 
      <ScheduleSection />
      <Announcer />
      <PrizeSection />
      <VideoGallery /> 
      <GalleryPreview />
    </div>
  );
}