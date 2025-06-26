import { Hero } from "@/components/HomePage/Hero";
import { GalleryPreview } from "@/components/GalleryPage/GalleryPreview";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";
import News from "@/components/News/News";
import Announcer from "@/components/Announcer/Announcer";

export function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <ScheduleSection />
      <PrizeSection />
      <News />
      <Announcer />
      <GalleryPreview />
    </div>
  );
}