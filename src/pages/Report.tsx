import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function Report() {
  return (
    <div className="container py-16 max-w-2xl">
      <SectionTitle eyebrow="// Report" title="Flag a player or bug" subtitle="Help us keep the grid clean." />
      <GlowCard className="mt-10">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); toast({ title: "Report sent", description: "Our moderators will review within 24h." }); (e.target as HTMLFormElement).reset(); }}>
          <div className="space-y-2"><Label htmlFor="target">Player callsign / bug ID</Label><Input id="target" required /></div>
          <div className="space-y-2"><Label htmlFor="reason">Reason</Label><Input id="reason" placeholder="Cheating, abuse, bug..." required /></div>
          <div className="space-y-2"><Label htmlFor="details">Details</Label><Textarea id="details" rows={6} required /></div>
          <MagnetButton type="submit">Submit report</MagnetButton>
        </form>
      </GlowCard>
    </div>
  );
}