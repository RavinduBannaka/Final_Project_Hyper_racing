import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { CarsShowcase } from "@/components/sections/CarsShowcase";
import { MapPreview } from "@/components/sections/MapPreview";
import { CommunityCTA } from "@/components/sections/CommunityCTA";

export default function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CarsShowcase />
      <MapPreview />
      <CommunityCTA />
    </>
  );
}
