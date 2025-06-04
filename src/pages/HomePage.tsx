import React from "react";
import { Hero } from "@/components/HomePage/Hero";
import { UpcomingShows } from "@/components/HomePage/UpcomingShows";
import { GalleryPreview } from "@/components/HomePage/GalleryPreview";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";

export function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <ScheduleSection />
      <UpcomingShows />
      <GalleryPreview />
      <PrizeSection />
    </div>
  );
}