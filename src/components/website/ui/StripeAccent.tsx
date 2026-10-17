import { cn } from "@/utils/cn";

/** Three slanted bars that echo the speed-strokes of the company logo. */
export function StripeAccent({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-end gap-1", className)}>
      <span className={cn("h-4 w-1.5 -skew-x-[22deg] rounded-full", onDark ? "bg-white/80" : "bg-brand-600")} />
      <span className="h-6 w-1.5 -skew-x-[22deg] rounded-full bg-accent-500" />
      <span className={cn("h-4 w-1.5 -skew-x-[22deg] rounded-full", onDark ? "bg-white/80" : "bg-brand-600")} />
    </span>
  );
}
