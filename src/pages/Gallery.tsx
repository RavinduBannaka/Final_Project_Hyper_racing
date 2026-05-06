import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCarImages } from "@/hooks/useCarImages";

const galleryImgs = [g1, g2, g3, g4];

export default function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);
  const { cars: carImages, loading } = useCarImages();

  const allImgs = [...galleryImgs, ...carImages.map((c) => c.url)];

  return (
    <div className="container py-16">
      <SectionTitle eyebrow="// Gallery" title="The cinema of speed" />
      {loading && (
        <div className="mt-12 text-center text-muted-foreground">Loading cars...</div>
      )}
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {allImgs.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.03} className="mb-4 break-inside-avoid">
              <button onClick={() => setOpen(src)} className="block w-full overflow-hidden rounded-xl border border-border/60 group">
                <img src={src} alt="" className="w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"
                  onError={(e) => {
                    console.error(`[Gallery] Failed to load image: ${src}`);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </button>
            </ScrollReveal>
          ))}
        </div>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-primary/40 bg-background p-0 overflow-hidden">
          {open && <img src={open} alt="" className="w-full" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
