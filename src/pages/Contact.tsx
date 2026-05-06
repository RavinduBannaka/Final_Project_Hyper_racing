import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    toast({ title: "Message received", description: "Our pit crew will reach out shortly." });
  };

  return (
    <div className="container py-16 max-w-3xl">
      <SectionTitle eyebrow="// Contact" title="Hit the radio" subtitle="Press inquiries, bug reports, partnership pitches — drop us a line." />
      <GlowCard className="mt-12">
        <form className="space-y-5" onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={6} required />
          </div>
          <MagnetButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send transmission"}
          </MagnetButton>
        </form>
      </GlowCard>
    </div>
  );
}