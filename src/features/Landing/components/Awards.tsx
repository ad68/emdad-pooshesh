import { useState, type ReactNode } from "react";
import { Award, Medal, ZoomIn } from "lucide-react";
import { AWARDS, type AwardItem } from "@/data/content";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/utils/cn";
import { Container } from "@/components/website/ui/Container";
import { Modal } from "@/components/website/ui/Modal";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";
import { SmartImage } from "@/components/website/ui/SmartImage";

/** Ornamental corner marks that give the frame a certificate feel. */
function Corners() {
  const base = "absolute size-5 border-accent-500/70";
  return (
    <>
      <span aria-hidden="true" className={cn(base, "top-2 right-2 rounded-tr-md border-t-2 border-r-2")} />
      <span aria-hidden="true" className={cn(base, "top-2 left-2 rounded-tl-md border-t-2 border-l-2")} />
      <span aria-hidden="true" className={cn(base, "right-2 bottom-2 rounded-br-md border-r-2 border-b-2")} />
      <span aria-hidden="true" className={cn(base, "bottom-2 left-2 rounded-bl-md border-b-2 border-l-2")} />
    </>
  );
}

function CertificatePlaceholder({ large = false }: { large?: boolean }) {
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-4 bg-linear-to-b from-white to-brand-50/60 p-6 text-center">
      <Corners />
      <span
        className={cn(
          "grid place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 ring-4 ring-brand-100",
          large ? "size-20" : "size-14"
        )}
      >
        <Award className={large ? "size-10" : "size-7"} aria-hidden="true" />
      </span>
      <div className="w-full space-y-2" aria-hidden="true">
        <div className="mx-auto h-2.5 w-3/4 rounded-full bg-slate-200" />
        <div className="mx-auto h-2 w-1/2 rounded-full bg-slate-200" />
        <div className="mx-auto mt-4 h-2 w-2/3 rounded-full bg-slate-100" />
        <div className="mx-auto h-2 w-3/5 rounded-full bg-slate-100" />
      </div>
      <p className={cn("font-extrabold text-brand-800", large ? "text-lg" : "text-sm")}>محل تصویر لوح تقدیر</p>

    </div>
  );
}

function Field({ value, placeholder, children }: { value?: string; placeholder: string; children: (text: string) => ReactNode }) {
  if (value) return <>{children(value)}</>;
  return (
    <span className="inline-block rounded-full border border-dashed border-white/40 px-3 py-0.5 text-xs text-white/80">
      [ {placeholder} ]
    </span>
  );
}

function AwardCard({ award, position, onOpen }: { award: AwardItem; position: number; onOpen: () => void }) {
  const label = award.title ?? `لوح تقدیر شمارهٔ ${toFaDigits(position)}`;

  return (
    <button type="button" onClick={onOpen} aria-label={`نمایش بزرگ‌تر: ${label}`} className="group block w-full text-start">
      <div className="relative rounded-2xl bg-linear-to-b from-[#fdfaf3] to-[#efe7d6] p-3 shadow-2xl shadow-black/40 ring-1 ring-white/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-accent-500/20">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-[5px] border-double border-brand-600/40 bg-white">
          {award.image ? (
            <SmartImage
              src={award.image}
              alt={label}
              className="size-full bg-white"
              imgClassName="object-contain p-2"
            />
          ) : (
            <CertificatePlaceholder />
          )}
          <span className="absolute inset-0 grid place-items-center bg-brand-950/0 transition-colors duration-300 group-hover:bg-brand-950/40">
            <span className="grid size-12 scale-75 place-items-center rounded-full bg-accent-500 text-brand-950 opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              <ZoomIn className="size-6" aria-hidden="true" />
            </span>
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-1.5 text-center">

        <p className="text-sm text-white/85">
          <Field value={award.issuer} placeholder="سازمان صادرکننده">{(text) => text}</Field>
        </p>
        <p className="text-sm text-accent-300">
          <Field value={award.date} placeholder="تاریخ دریافت">{(text) => text}</Field>
        </p>
      </div>
    </button>
  );
}

export function Awards() {
  const [activeAward, setActiveAward] = useState<number | null>(null);
  const current = activeAward !== null ? AWARDS[activeAward] : null;

  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-linear-to-b from-brand-800 via-brand-900 to-brand-950 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -top-32 -right-32 size-[28rem] rounded-full bg-accent-500/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-brand-500/20 blur-3xl" />

      <Container className="relative">
        <Reveal>
          <div className="mb-5 flex justify-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20 backdrop-blur">
              <Medal className="size-8" aria-hidden="true" />
            </span>
          </div>
          <SectionHeading
            onDark
            eyebrow="افتخارات"
            title="لوح‌های تقدیر و افتخارات"
            description="سندی از اعتماد سازمان‌ها و مراجعین؛ لوح‌ها و گواهی‌های تأییدشدهٔ مرکز در این بخش به نمایش درمی‌آید."
          />
        </Reveal>

        {AWARDS.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-white/25 px-6 py-16 text-center">
            <Award className="size-10 text-white/70" aria-hidden="true" />
            <p className="font-bold">هنوز لوح تقدیری ثبت نشده است.</p>
          </div>
        ) : (
          <ul className="no-scrollbar mt-14 -mx-4 flex justify-center snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-3 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-7">
            <li></li>
            {AWARDS.map((award, i) => (
              <li key={award.id} className="w-[72%] shrink-0 snap-center sm:w-auto">
                <Reveal delay={(i % 4) * 90}>
                  <AwardCard award={award} position={i + 1} onOpen={() => setActiveAward(i)} />
                </Reveal>
              </li>
            ))}
            <li></li>
          </ul>
        )}


      </Container>

      {current && activeAward !== null && (
        <Modal
          label={current.title ?? `لوح تقدیر شمارهٔ ${toFaDigits(activeAward + 1)}`}
          onClose={() => setActiveAward(null)}
          className="max-w-xl"
        >
          <div className="overflow-hidden rounded-3xl bg-linear-to-b from-[#fdfaf3] to-[#efe7d6] p-4 shadow-2xl">
            <div className="relative mx-auto max-h-[68vh] aspect-[3/4] overflow-hidden rounded-xl border-[6px] border-double border-brand-600/40 bg-white">
              {current.image ? (
                <img src={current.image} alt={current.title ?? "لوح تقدیر"} className="size-full object-contain p-2" />
              ) : (
                <CertificatePlaceholder large />
              )}
            </div>
            <div className="mt-4 space-y-1 text-center">

              <p className="text-sm text-slate-600">{current.issuer ?? "[ سازمان صادرکننده ]"}</p>
              <p className="text-sm font-bold text-accent-700">{current.date ?? "[ تاریخ دریافت ]"}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
