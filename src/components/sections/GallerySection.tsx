import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { Link } from "react-router-dom";

const tiles = [
  { src: g1, label: "Aerial — Neon Shibuya", className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
  { src: g2, label: "Cockpit — Skylink", className: "aspect-[4/3]" },
  { src: g3, label: "Highway Drag", className: "aspect-[4/3]" },
  { src: g4, label: "Spectre Drift", className: "md:col-span-2 aspect-[16/9]" },
];

export function GallerySection() {
  return (
    <section className="container py-20">
      <SectionTitle eyebrow="// Gallery" title="Postcards from the grid" subtitle="Every race tells a story. Here are a few." />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
        {tiles.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.05} className={t.className}>
            <div className="group relative h-full w-full overflow-hidden rounded-xl border border-border/60">
              <img src={t.src} alt={t.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-primary">
                {t.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/gallery" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">View full gallery →</Link>
      </div>
    </section>
  );
}