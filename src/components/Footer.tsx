import { Link } from "react-router-dom";
import { GamingLogo } from "@/components/GamingLogo";
import { Github, Twitter, Twitch, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/80 backdrop-blur-md mt-32">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <GamingLogo className="h-10 w-auto" />
          <p className="text-sm text-muted-foreground max-w-xs">
            The neon-drenched online arcade racer. Push the limits, paint the asphalt.
          </p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-primary"><Youtube className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitch" className="hover:text-primary"><Twitch className="h-5 w-5" /></a>
            <a href="#" aria-label="Github" className="hover:text-primary"><Github className="h-5 w-5" /></a>
          </div>
        </div>

        <FooterCol title="Game">
          <FooterLink to="/cars">Cars</FooterLink>
          <FooterLink to="/maps">Maps</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/spin">Daily Spin</FooterLink>
        </FooterCol>
        <FooterCol title="Community">
          <FooterLink to="/leaderboard">Leaderboard</FooterLink>
          <FooterLink to="/community">Live Chat</FooterLink>
          <FooterLink to="/report">Report a player</FooterLink>
        </FooterCol>
        <FooterCol title="Studio">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/store/coins">Store</FooterLink>
        </FooterCol>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} HyperRacing. All trademarks are property of their respective owners.</span>
          <span className="font-mono">v1.0.0 // CYBR-NETWORK ONLINE</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-muted-foreground hover:text-primary transition-colors">{children}</Link>
    </li>
  );
}