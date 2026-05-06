import { Gauge, Zap, Globe, Trophy, Users, Sparkles } from "lucide-react";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

const features = [
  { icon: Gauge, title: "Hyper Physics", desc: "Custom drift physics that reward skill, not button mashing.", glow: "cyan" as const },
  { icon: Zap, title: "Nitro Reckoning", desc: "Chain combos to charge a five-stage nitro you can split mid-corner.", glow: "magenta" as const },
  { icon: Globe, title: "36 Live Circuits", desc: "Day, night, rain, dust — every track is a different beast.", glow: "lime" as const },
  { icon: Trophy, title: "Ranked Seasons", desc: "Climb from Rookie to Apex with weekly resets and exclusive cards.", glow: "cyan" as const },
  { icon: Users, title: "8-Player Online", desc: "Crossplay grids with regional matchmaking under 60ms.", glow: "magenta" as const },
  { icon: Sparkles, title: "Card Customization", desc: "Trade, fuse, and upgrade car cards to push every stat to legendary.", glow: "lime" as const },
];

export function Features() {
  return (
    <section className="container py-20">
      <SectionTitle eyebrow="// Features" title="Built for the apex" subtitle="Everything you need to outpace the pack — and nothing that gets in your way." />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.05}>
            <GlowCard glow={f.glow} className="h-full">
              <f.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}