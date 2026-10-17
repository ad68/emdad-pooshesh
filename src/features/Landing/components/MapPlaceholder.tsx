import { MapPinned } from "lucide-react";
import { CONTACT } from "@/data/site";

/** Shows a real embedded map when CONTACT.mapEmbedUrl is set, otherwise a tidy placeholder. */
export function MapPlaceholder() {
  if (CONTACT.mapEmbedUrl) {
    return (
      <iframe
        src={CONTACT.mapEmbedUrl}
        title="نقشهٔ موقعیت مرکز"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full rounded-3xl border-0 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:h-96"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="جایگاه نقشهٔ موقعیت مرکز"
      className="relative h-80 overflow-hidden rounded-3xl bg-brand-50 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:h-96"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-teal" />
      {/* Stylised roads */}
      <div aria-hidden="true" className="absolute top-1/2 -left-10 h-6 w-[130%] -rotate-[24deg] bg-white shadow-sm" />
      <div aria-hidden="true" className="absolute top-[18%] -left-10 h-4 w-[130%] rotate-[12deg] bg-white/90" />
      <div aria-hidden="true" className="absolute top-0 left-1/3 h-[130%] w-5 rotate-[14deg] bg-white/90" />
      <div aria-hidden="true" className="absolute -right-10 bottom-8 size-40 rounded-full bg-brand-100/80" />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="flex max-w-sm flex-col items-center gap-3 rounded-3xl bg-white/95 px-6 py-6 text-center shadow-2xl shadow-brand-950/15 backdrop-blur">
          <span className="relative grid size-14 place-items-center rounded-2xl bg-accent-500 text-brand-950">
            <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-2xl bg-accent-500" />
            <MapPinned className="relative size-7" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-extrabold text-brand-950">موقعیت مرکز روی نقشه</h3>
          <p className="text-sm leading-7 text-slate-600">
            پس از ثبت پیوند نقشه، موقعیت دقیق مرکز در همین بخش نمایش داده می‌شود.
          </p>

        </div>
      </div>
    </div>
  );
}
