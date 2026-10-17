import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

/** Keeps phone numbers left-to-right and correctly ordered inside RTL text. */
export function PhoneNumber({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span dir="ltr" className={cn("inline-block tabular-nums", className)} {...props} />;
}
