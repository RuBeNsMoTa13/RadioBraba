import React from "react";
import { Hero } from "@/components/HomePage/Hero";
import { UpcomingShows } from "@/components/HomePage/UpcomingShows";
import { GalleryPreview } from "@/components/HomePage/GalleryPreview";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";
import News from "@/components/News/News";
import Announcer from "@/components/Announcer/Announcer";

export function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <ScheduleSection />
      <UpcomingShows />
      <GalleryPreview />
      <PrizeSection />
      <News />
      <Announcer />
    </div>
  );
}