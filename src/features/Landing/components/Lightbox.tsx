import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, LoaderCircle } from "lucide-react";
import type { GalleryImage } from "@/data/content";
import { toFaDigits } from "@/lib/format";
import { Modal } from "@/components/website/ui/Modal";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function LightboxImage({ image }: { image: GalleryImage }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className="relative flex min-h-[45vh] items-center justify-center bg-brand-950/60">
      {status === "loading" && (
        <LoaderCircle className="absolute size-9 animate-spin text-white/80" aria-label="در حال بارگذاری" />
      )}
      {status === "error" ? (
        <div className="flex flex-col items-center gap-2 p-10 text-white/80">
          <ImageOff className="size-10" aria-hidden="true" />
          <span>تصویر در دسترس نیست</span>
        </div>
      ) : (
        <img
          src={image.full}
          alt={image.caption}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`max-h-[70vh] w-auto max-w-full object-contain transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

/** Full-screen image viewer with previous / next navigation (arrows, buttons). */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const total = images.length;
  const image = images[index];

  const goNext = () => onIndexChange((index + 1) % total);
  const goPrevious = () => onIndexChange((index - 1 + total) % total);

  // RTL: the left arrow key moves forward, the right arrow key moves back.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onIndexChange((index + 1) % total);
      if (event.key === "ArrowRight") onIndexChange((index - 1 + total) % total);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, total, onIndexChange]);

  // Warm the cache for the neighbouring images.
  useEffect(() => {
    [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((neighbour) => {
      const preload = new Image();
      preload.src = neighbour.full;
    });
  }, [images, index, total]);

  const navButton =
    "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-800 shadow-lg backdrop-blur transition hover:bg-accent-500 hover:text-brand-950";

  return (
    <Modal label={`نمایش تصویر ${toFaDigits(index + 1)} از ${toFaDigits(total)}`} onClose={onClose} className="max-w-5xl">
      <figure className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
        <LightboxImage key={image.id} image={image} />

        {total > 1 && (
          <>
            <button type="button" onClick={goPrevious} aria-label="تصویر قبلی" className={`${navButton} right-3`}>
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={goNext} aria-label="تصویر بعدی" className={`${navButton} left-3`}>
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
          </>
        )}

        <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="font-bold text-brand-950">{image.caption}</span>
          <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700 tabular-nums">
            {toFaDigits(index + 1)} از {toFaDigits(total)}
          </span>
        </figcaption>
      </figure>
    </Modal>
  );
}
