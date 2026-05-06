import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { Input } from "@/components/ui/input";
import { MagnetButton } from "@/components/reactbits/MagnetButton";

interface Msg { id: number; user: string; body: string; time: string }

const seed: Msg[] = [
  { id: 1, user: "NeonGhost", body: "Anyone got tips for the void canyon hairpin?", time: "21:04" },
  { id: 2, user: "ApexHyena", body: "Late-brake into 4, full nitro out. Trust me.", time: "21:05" },
  { id: 3, user: "ChromeWolf", body: "Lobby 7 is wide open — drift only", time: "21:07" },
];

export default function Community() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [text, setText] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: Date.now(), user: "You", body: text.trim(), time: "now" }]);
    setText("");
  };
  return (
    <div className="container py-16 max-w-4xl">
      <SectionTitle eyebrow="// Community" title="Pit-radio chat" subtitle="Live global lobby. Be cool, race hard." />
      <GlowCard className="mt-10 p-0">
        <div className="h-[480px] overflow-y-auto p-6 space-y-3">
          {msgs.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-primary grid place-items-center text-xs font-display font-black text-primary-foreground">
                {m.user.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <span className={m.user === "You" ? "text-primary" : "text-foreground"}>{m.user}</span> · {m.time}
                </div>
                <div className="text-sm">{m.body}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="border-t border-border/60 p-4 flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Drop a message in the lobby..." />
          <MagnetButton type="submit" className="px-6 py-3">Send</MagnetButton>
        </form>
      </GlowCard>
    </div>
  );
}