import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";

export default function About() {
  return (
    <div className="container py-16 max-w-5xl">
      <SectionTitle eyebrow="// Studio" title="Born in the slipstream" subtitle="HyperRacing is built by a small team of racing-game lifers obsessed with feel, frame-rate, and that perfect drift apex." align="center" />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { t: "Our mission", d: "Make the most exciting arcade racer of the decade — and keep it free to play." },
          { t: "No pay-to-win", d: "Coins buy cosmetics and convenience. Skill wins races. Always." },
          { t: "Community first", d: "Players shape the season. Vote in tracks, submit liveries, hunt bugs together." },
        ].map((b, i) => (
          <ScrollReveal key={b.t} delay={i * 0.05}>
            <GlowCard glow={(["cyan","magenta","lime"] as const)[i]} className="h-full">
              <h3 className="font-display text-xl font-bold">{b.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}