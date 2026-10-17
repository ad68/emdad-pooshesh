import { PhoneCall } from "lucide-react";
import { CONTACT } from "@/data/site";
import { telHref } from "@/lib/format";

/** Compact always-visible emergency call action for phones and tablets. */
export function FloatingEmergencyButton() {
  return (
    <a
      href={telHref(CONTACT.emergency.tel)}
      aria-label="تماس اورژانس"
      className="fixed start-4 bottom-4 z-40 flex h-14 items-center gap-3 rounded-full bg-accent-500 ps-5 pe-6 font-extrabold text-brand-950 shadow-xl shadow-accent-600/40 transition active:scale-95 lg:hidden"
    >
      <span className="relative grid size-9 place-items-center rounded-full bg-brand-950 text-white">
        <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-full bg-brand-950/60" />
        <PhoneCall className="relative size-5" aria-hidden="true" />
      </span>
      <span>تماس اورژانس</span>
    </a>
  );
}
