import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { GlitchText } from "@/components/reactbits/GlitchText";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <ScrollReveal>
      <div className={align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}>
        {eyebrow && (
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">
            <GlitchText text={eyebrow} />
          </div>
        )}
        <h2 className="font-display text-4xl md:text-5xl font-black">
          <span className="text-gradient">{title}</span>
        </h2>
        {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      </div>
    </ScrollReveal>
  );
}