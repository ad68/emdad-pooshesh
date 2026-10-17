import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-bold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        // Dark teal text on orange keeps WCAG AA contrast.
        primary:
          "bg-accent-500 text-brand-950 shadow-lg shadow-accent-500/30 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40",
        secondary:
          "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-xl",
        outline:
          "border-2 border-brand-600 bg-transparent text-brand-700 hover:bg-brand-600 hover:text-white",
        outlineLight:
          "border-2 border-white/70 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-brand-800",
        light: "bg-white text-brand-700 shadow-lg shadow-black/10 hover:bg-brand-50",
        ghost: "bg-transparent text-brand-700 hover:bg-brand-50",
      },
      size: {
        sm: "h-10 gap-2 px-4 text-sm",
        md: "h-12 gap-2.5 px-6 text-base",
        lg: "h-14 gap-3 px-8 text-base sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type StyleOptions = VariantProps<typeof buttonVariants> & { className?: string };

export function buttonStyles({ variant, size, className }: StyleOptions = {}) {
  return cn(buttonVariants({ variant, size }), className);
}

interface ContentProps extends StyleOptions {
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  children: ReactNode;
}

function ButtonContent({ leadingIcon: Leading, trailingIcon: Trailing, children }: ContentProps) {
  return (
    <>
      {Leading && <Leading className="size-5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {Trailing && <Trailing className="size-5 shrink-0" aria-hidden="true" />}
    </>
  );
}
type ButtonProps = ContentProps & Omit<ComponentPropsWithoutRef<"button">, keyof ContentProps>;
export function Button({
  variant,
  size,
  className,
  leadingIcon,
  trailingIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </button>
  );
}

type ButtonLinkProps = ContentProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ContentProps> & { href: string };

export function ButtonLink({
  variant,
  size,
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </a>
  );
}
