import { Link } from "react-router-dom";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { GlitchText } from "@/components/reactbits/GlitchText";
import { Marquee } from "@/components/reactbits/Marquee";

export function CommunityCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Marquee className="absolute inset-y-0 left-0 right-0 flex items-center opacity-[0.06]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-display text-[12rem] font-black uppercase">HYPER · RACING ·</span>
        ))}
      </Marquee>
      <div className="container relative">
        <ScrollReveal>
          <div className="rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-xl p-10 md:p-16 text-center shadow-elev">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              <GlitchText text="// JOIN THE GRID" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-gradient">
              Engines hot. Lobby open.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Free account. Three starter cars. Daily spin for premium cards.
              See you on the leaderboard.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register"><MagnetButton variant="primary" className="px-8 py-4">Create your racer</MagnetButton></Link>
              <Link to="/community"><MagnetButton variant="outline" className="px-8 py-4">Join chat</MagnetButton></Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}