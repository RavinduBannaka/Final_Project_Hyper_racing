import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "ghost" | "outline";
}

export const MagnetButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "primary", ...props }, _ref) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 250, damping: 18 });
    const sy = useSpring(y, { stiffness: 250, damping: 18 });

    const variants: Record<string, string> = {
      primary:
        "bg-gradient-primary text-primary-foreground shadow-neon hover:brightness-110",
      outline:
        "border border-primary/60 text-primary hover:bg-primary/10 hover:shadow-neon",
      ghost: "text-foreground hover:bg-muted/40",
    };

    return (
      <motion.button
        ref={ref}
        style={{ x: sx, y: sy }}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set((e.clientX - r.left - r.width / 2) * 0.25);
          y.set((e.clientY - r.top - r.height / 2) * 0.25);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-display text-sm font-bold uppercase tracking-widest transition-all clip-hex",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
MagnetButton.displayName = "MagnetButton";