import { Link } from "react-router-dom";
import { TiltedCard } from "@/components/reactbits/TiltedCard";
import { CarData } from "@/services/appwriteCars";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const rarityColor: Record<string, string> = {
  Common: "text-muted-foreground border-border",
  Rare: "text-primary border-primary/60",
  Epic: "text-secondary border-secondary/60",
  Legendary: "text-accent border-accent/60",
};

export function CarCard({ car }: { car: CarData }) {
  return (
    <TiltedCard className="h-full">
      <Link
        to="/cars"
        className="block h-full rounded-xl border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden group hover:border-primary/60 transition-colors shadow-elev"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted/50 to-background">
          <img
            src={car.url}
            alt={car.displayName}
            loading="lazy"
            width={1024}
            height={640}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              console.error(
                `[Cars] Failed to load image for "${car.displayName}". URL: ${car.url}`
              );
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className={cn("absolute top-3 left-3 px-2 py-1 rounded-md border bg-background/70 backdrop-blur text-[10px] font-mono uppercase tracking-widest", rarityColor[car.rarity])}>
            {car.rarity}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/70 backdrop-blur border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {car.category}
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold leading-tight">{car.displayName}</h3>
            <div className="flex items-center gap-1 font-mono text-sm text-accent">
              <Coins className="h-3.5 w-3.5" />{car.price.toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(car.stats).map(([k, v]) => (
              <div key={k}>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{k}</div>
                <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </TiltedCard>
  );
}
