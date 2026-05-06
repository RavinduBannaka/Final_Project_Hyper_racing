import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "lime";
}

const glowMap: Record<string, string> = {
  cyan: "before:bg-primary/30 hover:shadow-neon",
  magenta: "before:bg-secondary/30 hover:shadow-magenta",
  lime: "before:bg-accent/30",
};

export function GlowCard({ children, className, glow = "cyan" }: Props) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60",
        "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:opacity-0 before:blur-2xl before:transition-opacity hover:before:opacity-100",
        glowMap[glow],
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      {children}
    </div>
  );
}