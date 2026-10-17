import { BRAND } from "@/data/site";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";

interface BrandLockupProps {
  /** "light" is used on the teal footer: the logo sits on a white tile for full legibility. */
  tone?: "default" | "light";
  className?: string;
}

/** Logo + the two-line Persian company name. */
export function BrandLockup({ tone = "default", className }: BrandLockupProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      {isLight ? (
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-lg shadow-black/10">
          <Logo className="size-full" />
        </span>
      ) : (
        <Logo className="size-12 shrink-0 sm:size-14" />
      )}
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-xs font-semibold sm:text-sm",
            isLight ? "text-white/85" : "text-slate-500"
          )}
        >
          {BRAND.nameLine1}
        </span>
        <span
          className={cn(
            "text-lg font-extrabold sm:text-xl",
            isLight ? "text-white" : "text-brand-700"
          )}
        >
          {BRAND.nameLine2}
        </span>
      </span>
    </span>
  );
}
