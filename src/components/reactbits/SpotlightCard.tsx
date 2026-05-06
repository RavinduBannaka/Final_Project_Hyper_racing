import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-md",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "before:[background:radial-gradient(400px_circle_at_var(--mx)_var(--my),hsl(var(--primary)/0.18),transparent_60%)]",
        className
      )}
    >
      {children}
    </div>
  );
}