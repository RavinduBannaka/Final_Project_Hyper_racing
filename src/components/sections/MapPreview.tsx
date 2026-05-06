import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { maps } from "@/data/maps";
import { Link } from "react-router-dom";

export function MapPreview() {
  return (
    <section className="container py-20">
      <SectionTitle eyebrow="// Circuits" title="Master the neon" subtitle="36 live circuits across six biomes — each tuned for a different driving style." />
      <div className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
        <ScrollReveal>
          <GlowCard glow="magenta" className="aspect-square p-0 overflow-hidden">
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <defs>
                <linearGradient id="trk" x1="0" x2="1">
                  <stop offset="0%" stopColor="hsl(184 100% 55%)" />
                  <stop offset="100%" stopColor="hsl(320 100% 60%)" />
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
              </defs>
              {/* grid */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} stroke="hsl(var(--border))" strokeOpacity="0.3" />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={400} stroke="hsl(var(--border))" strokeOpacity="0.3" />
              ))}
              <path id="track" d="M60,300 C60,180 140,80 220,80 C300,80 360,140 340,220 C320,300 240,340 180,300 C120,260 100,200 60,300 Z"
                fill="none" stroke="url(#trk)" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" />
              <path d="M60,300 C60,180 140,80 220,80 C300,80 360,140 340,220 C320,300 240,340 180,300 C120,260 100,200 60,300 Z"
                fill="none" stroke="hsl(var(--background))" strokeWidth="2" strokeDasharray="6 8" />
              <circle r="6" fill="hsl(var(--accent))">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#track" />
                </animateMotion>
              </circle>
            </svg>
          </GlowCard>
        </ScrollReveal>

        <div className="space-y-3">
          {maps.slice(0, 5).map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.05}>
              <Link to="/maps" className="block">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4 hover:border-primary/60 transition-colors"
                >
                  <div>
                    <div className="font-display text-lg font-bold">{m.name}</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {m.biome} · {m.length} · {m.laps} laps
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                    m.difficulty === "Insane" ? "text-secondary border-secondary/60" :
                    m.difficulty === "Pro" ? "text-primary border-primary/60" :
                    "text-accent border-accent/60"
                  }`}>{m.difficulty}</span>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}