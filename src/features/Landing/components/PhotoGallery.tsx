import { useMemo, useState } from "react";
import { ChevronDown, Images, ZoomIn } from "lucide-react";
import { GALLERY_CATEGORIES, GALLERY_IMAGES, type GalleryCategory } from "@/data/content";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/utils/cn";
import { Lightbox } from "./Lightbox";
import { Button } from "@/components/website/ui/Button";
import { Container } from "@/components/website/ui/Container";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";
import { SmartImage } from "@/components/website/ui/SmartImage";

const INITIAL_COUNT = 8;

export function PhotoGallery() {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((image) => image.category === category)),
    [category]
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const canExpand = filtered.length > INITIAL_COUNT;

  const selectCategory = (next: GalleryCategory | "all") => {
    setCategory(next);
    setExpanded(false);
  };

  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="گالری تصاویر"
            title="نگاهی به ناوگان، تجهیزات و کادر امدادی"
            description="تصاویری از آمبولانس‌ها، فضای داخلی و تجهیزات مراقبتی و تیم همراه بیماران."
          />
        </Reveal>

        <Reveal className="mt-10">
          <div role="group" aria-label="دسته‌بندی تصاویر" className="flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((item) => {
              const isActive = item.id === category;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectCategory(item.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                    isActive
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                      : "bg-paper text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-paper px-6 py-16 text-center">
            <Images className="size-10 text-slate-400" aria-hidden="true" />
            <p className="font-bold text-slate-700">هنوز تصویری در این دسته ثبت نشده است.</p>
            <Button variant="outline" size="sm" onClick={() => selectCategory("all")}>
              نمایش همه تصاویر
            </Button>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((image, i) => (
              <li key={image.id}>
                <Reveal delay={(i % 4) * 70}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`نمایش بزرگ‌تر تصویر: ${image.caption}`}
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-950/20 sm:rounded-3xl"
                  >
                    <SmartImage
                      src={image.thumb}
                      alt={image.caption}
                      className="aspect-[4/3] w-full"
                      imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-end bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                      <span className="flex w-full items-center justify-between gap-3">
                        <span className="text-start text-xs font-bold text-white sm:text-sm">{image.caption}</span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950">
                          <ZoomIn className="size-4" aria-hidden="true" />
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          {canExpand && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              trailingIcon={ChevronDown}
            >
              {expanded ? "نمایش تصاویر کمتر" : `مشاهده همه تصاویر (${toFaDigits(filtered.length)})`}
            </Button>
          )}
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
            تصاویری از ناوگان آمبولانس مرکز
          </p>
        </div>
      </Container>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
