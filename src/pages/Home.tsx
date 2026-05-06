import { HyperHero } from "@/components/sections/HyperHero";
import { HyperFeatures } from "@/components/sections/HyperFeatures";
import { HyperGallery } from "@/components/sections/HyperGallery";
import { AboutSection } from "@/components/sections/AboutSection";
import { CarBanner } from "@/components/sections/CarBanner";
import { HyperMapPreview } from "@/components/sections/HyperMapPreview";

export default function Home() {
  return (
    <div className="space-y-10">
      <HyperHero />
      <HyperFeatures />
      <HyperGallery />
      <AboutSection />
      <CarBanner />
      <HyperMapPreview />
    </div>
  );
}
