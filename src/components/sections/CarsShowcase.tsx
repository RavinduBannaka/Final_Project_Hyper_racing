import { Link } from "react-router-dom";
import { useState } from "react";
import { useCarImages } from "@/hooks/useCarImages";
import { CarCard } from "@/components/CarCard";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { carCategories } from "@/data/cars";

export function CarsShowcase() {
  const { cars, loading, error } = useCarImages();
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? cars : cars.filter((c) => c.category === filter);

  return (
    <section className="container py-20">
      <SectionTitle eyebrow="// Garage" title="Drive the impossible" subtitle="From street rats to Formula prototypes — every machine tuned to a hyper edge." />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {["All", ...carCategories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest transition-all",
              filter === c
                ? "border-primary text-primary bg-primary/10 shadow-neon"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="mt-10 text-center text-muted-foreground">Loading cars...</p>}
      {error && <p className="mt-10 text-center text-red-400">{error}</p>}
      {!loading && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((car, i) => (
            <ScrollReveal key={car.fileId} delay={i * 0.04}>
              <CarCard car={car} />
            </ScrollReveal>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/cars" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-primary hover:gap-3 transition-all">
          View full garage <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
