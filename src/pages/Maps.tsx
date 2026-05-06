import { Link } from "react-router-dom";
import { maps } from "@/data/maps";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Coins } from "lucide-react";
import { useMapImages } from "@/hooks/useMapImages";

export default function MapsPage() {
  const { maps: biomeImages, loading, error } = useMapImages();

  return (
    <div className="container py-16">
      <SectionTitle eyebrow="// Circuits" title="Pick your battlefield" subtitle="Six biomes. Thirty-six tracks. Endless racing lines." />

      {/* Biome preview images from Appwrite */}
      {loading && <p className="mt-12 text-center text-muted-foreground">Loading map previews...</p>}
      {error && <p className="mt-12 text-center text-red-400 text-sm">⚠️ {error}</p>}
      {!loading && biomeImages.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {biomeImages.map((map) => (
            <ScrollReveal key={map.fileId}>
              <SpotlightCard className="p-0 overflow-hidden rounded-xl border border-border/60">
                <div className="relative aspect-video">
                  <img
                    src={map.url}
                    alt={map.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      console.error(`[Maps] Failed to load image "${map.name}". URL: ${map.url}`);
                      (e.target as HTMLImageElement).style.opacity = "0.2";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-display text-2xl font-bold text-foreground">{map.name}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border border-primary/60 text-primary bg-primary/10">
                      Biome Preview
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Race map metadata cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {maps.map((m, i) => (
          <ScrollReveal key={m.id} delay={i * 0.04}>
            <SpotlightCard className="p-6 h-full">
              <Link to="/maps" className="block space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.biome}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                    m.difficulty === "Insane" ? "text-secondary border-secondary/60" :
                    m.difficulty === "Pro" ? "text-primary border-primary/60" : "text-accent border-accent/60"
                  }`}>{m.difficulty}</span>
                </div>
                <h3 className="font-display text-2xl font-bold">{m.name}</h3>
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{m.length} · {m.laps} laps</span>
                  <span className="inline-flex items-center gap-1 text-accent">
                    <Coins className="h-3.5 w-3.5" />{m.price === 0 ? "FREE" : m.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
