import { motion } from "framer-motion";
import { memo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const SplitText = memo(function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as: Tag = "h1",
}: SplitTextProps) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: "110%", opacity: 0, rotateX: -45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: delay + (wi * 4 + ci) * stagger,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
});