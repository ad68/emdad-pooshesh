import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { StripeAccent } from "./StripeAccent";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "start";
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-3 text-sm font-bold tracking-wide",
          onDark ? "text-accent-300" : "text-accent-700"
        )}
      >
        <StripeAccent onDark={onDark} />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl font-extrabold leading-snug sm:text-4xl",
          onDark ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-8 sm:text-lg", onDark ? "text-white/85" : "text-slate-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
