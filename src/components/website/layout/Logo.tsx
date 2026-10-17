import { BRAND } from "@/data/site";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
}

/** Displays the shared site logo from the public assets directory. */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt={`لوگوی ${BRAND.fullName}`}
      className={cn("object-contain", className)}
      draggable={false}
    />
  );
}
