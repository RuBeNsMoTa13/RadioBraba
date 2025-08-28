import { Suspense, lazy } from "react";
import { Hero } from "@/components/HomePage/Hero";
import { PrizeSection } from "@/components/HomePage/PrizeSection";
import { ScheduleSection } from "@/components/HomePage/ScheduleSection";
import Announcer from "@/components/Announcer/Announcer";
import { SimpleSpinner } from "@/components/ui/loading-spinner";

// Lazy load de componentes pesados (APIs externas, galerias, etc.)
const SupportsCarousel = lazy(() => import("@/components/SupportsCarousel").then(module => ({ default: module.SupportsCarousel })));
const VideoGallery = lazy(() => import("@/components/YoutubeAPI/VideoGallery"));
const InstaFeed = lazy(() => import("@/components/InstaAPI/InstaFeed").then(module => ({ default: module.InstaFeed })));

export function HomePage() {
  return (
    <div>
      {/* Componentes críticos carregados imediatamente */}
      <Hero />
      
      {/* Componentes não críticos com lazy loading */}
      <Suspense fallback={<SimpleSpinner />}>
        <SupportsCarousel />
      </Suspense>
      
      <ScheduleSection />
      <Announcer />
      <PrizeSection />
      
      <Suspense fallback={<SimpleSpinner />}>
        <VideoGallery />
      </Suspense>
      
      <Suspense fallback={<SimpleSpinner />}>
        <InstaFeed />
      </Suspense>
    </div>
  );
}