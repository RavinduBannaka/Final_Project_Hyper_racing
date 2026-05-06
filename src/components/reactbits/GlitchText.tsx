import { cn } from "@/lib/utils";

export function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span
      data-text={text}
      className={cn(
        "relative inline-block font-display tracking-widest",
        "before:absolute before:inset-0 before:content-[attr(data-text)] before:text-primary before:translate-x-[2px] before:opacity-70 before:mix-blend-screen",
        "after:absolute after:inset-0 after:content-[attr(data-text)] after:text-secondary after:-translate-x-[2px] after:opacity-70 after:mix-blend-screen",
        className
      )}
    >
      {text}
    </span>
  );
}