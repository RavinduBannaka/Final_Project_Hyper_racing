import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { useCarImages } from "@/hooks/useCarImages";
import { SplitText } from "@/components/reactbits/SplitText";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { ParticleField } from "@/components/reactbits/ParticleField";
import { GlitchText } from "@/components/reactbits/GlitchText";

export function Hero() {
  const { getCarByName, loading } = useCarImages();
  const heroCar = getCarByName("blackCar");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-muted/20" />
        ) : heroCar ? (
          <img
            src={heroCar.url}
            alt="Cyberpunk hypercar speeding through neon city"
            className="h-full w-full object-cover opacity-50"
            width={1920}
            height={1080}
            onError={(e) => {
              console.error(`[Hero] Failed to load car image. URL: ${heroCar.url}`);
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-background to-muted/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/40" />
      </div>
      <ParticleField className="absolute inset-0 -z-10 opacity-60" />

      <div className="container relative grid lg:grid-cols-12 gap-10 items-center py-24">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Season 04 — Neon Reckoning live now
          </motion.div>

          <SplitText
            text="Push the redline."
            as="h1"
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-foreground"
          />
          <SplitText
            text="Own the night."
            as="h2"
            delay={0.5}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-gradient"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="max-w-xl text-base md:text-lg text-muted-foreground"
          >
            Collect 60+ hypercars, master neon-soaked circuits, and climb the global
            leaderboard. Free to race. Built to be hyper.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/register">
              <MagnetButton variant="primary" className="px-8 py-4">
                Start Racing <ChevronRight className="h-4 w-4" />
              </MagnetButton>
            </Link>
            <Link to="/gallery">
              <MagnetButton variant="outline" className="px-8 py-4">
                <Play className="h-4 w-4" /> Watch Trailer
              </MagnetButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-6 pt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            <span><GlitchText text="//" className="text-primary" /> Free to play</span>
            <span><GlitchText text="//" className="text-secondary" /> Cross-platform</span>
            <span className="hidden sm:inline"><GlitchText text="//" className="text-accent" /> No P2W</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-8 rounded-full border border-primary/40 animate-spin-slow" />
            <div className="absolute inset-16 rounded-full border border-secondary/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "26s" }} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl border border-primary/40 bg-card/40 backdrop-blur-md p-6 shadow-neon w-64">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">Live Telemetry</div>
                <div className="mt-3 font-display text-5xl font-black tabular-nums">387<span className="text-primary text-2xl">km/h</span></div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono text-xs">
                  <Stat label="LAP" value="1:42" />
                  <Stat label="GEAR" value="6" />
                  <Stat label="RPM" value="9.4k" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-xs font-mono uppercase tracking-widest">
        ↓ Scroll to enter the grid
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className="text-foreground font-bold">{value}</div>
    </div>
  );
}