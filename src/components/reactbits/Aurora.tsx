import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute -top-1/3 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-primary/30 blur-[120px] animate-aurora-shift" />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full bg-secondary/30 blur-[140px] animate-aurora-shift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px] animate-aurora-shift"
        style={{ animationDelay: "-3s" }}
      />
    </div>
  );
}