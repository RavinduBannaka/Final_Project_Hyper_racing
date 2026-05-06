import { AnimatedCounter } from "@/components/reactbits/AnimatedCounter";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";

const items = [
  { label: "Active Racers", value: 248_412, suffix: "+" },
  { label: "Tracks Mastered", value: 36 },
  { label: "Cars Collected", value: 62 },
  { label: "Races Run Today", value: 1_204_877 },
];

export function Stats() {
  return (
    <section className="container py-20">
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.label} className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-md p-6 text-center">
              <AnimatedCounter
                to={it.value}
                suffix={it.suffix}
                className="block font-display text-3xl md:text-5xl font-black text-gradient tabular-nums"
              />
              <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}