import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { toast } from "@/hooks/use-toast";

const segments = ["100c", "Rare Card", "500c", "Nitro x3", "200c", "Epic Card", "50c", "Legendary"];
const colors = [
  "hsl(184 100% 55%)", "hsl(320 100% 60%)", "hsl(80 100% 60%)", "hsl(184 100% 55%)",
  "hsl(320 100% 60%)", "hsl(80 100% 60%)", "hsl(184 100% 55%)", "hsl(320 100% 60%)",
];

export default function SpinWheel() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * segments.length);
    const target = 360 * 6 + (360 - (idx * 45 + 22));
    setAngle((a) => a + target);
    setTimeout(() => {
      setSpinning(false);
      toast({ title: "You won!", description: `Reward: ${segments[idx]}` });
    }, 4200);
  };

  const seg = 360 / segments.length;

  return (
    <div className="container py-16 max-w-3xl">
      <SectionTitle eyebrow="// Daily Spin" title="Free reward, every 24h" subtitle="Spin the wheel for coins, rare cards, and exclusive boosters." />
      <GlowCard className="mt-10 grid place-items-center py-12">
        <div className="relative h-80 w-80">
          <div
            className="h-full w-full rounded-full border-4 border-primary/60 transition-transform duration-[4000ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-neon"
            style={{
              transform: `rotate(${angle}deg)`,
              background: `conic-gradient(${segments
                .map((_, i) => `${colors[i]} ${i * seg}deg ${(i + 1) * seg}deg`)
                .join(",")})`,
            }}
          >
            {segments.map((s, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left font-display text-xs font-bold uppercase tracking-widest text-background"
                style={{
                  transform: `rotate(${i * seg + seg / 2}deg) translateX(60px)`,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-background border-2 border-primary grid place-items-center font-display text-xs font-black text-primary">
            HR
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-accent z-10" />
        </div>
        <MagnetButton onClick={spin} className="mt-10 px-10 py-4" disabled={spinning}>
          {spinning ? "Spinning..." : "Spin the wheel"}
        </MagnetButton>
      </GlowCard>
    </div>
  );
}