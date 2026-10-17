import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,video[controls],[tabindex]:not([tabindex="-1"])';

interface ModalProps {
  /** Accessible name announced by screen readers. */
  label: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible modal dialog: Escape closes it, focus is trapped inside,
 * page scrolling is locked and focus returns to the trigger on close.
 * Mount it conditionally: {isOpen && <Modal ... />}
 */
export function Modal({ label, onClose, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center px-3 pt-16 pb-4 sm:px-6">
      <div className="absolute inset-0 bg-brand-950/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn("relative z-10 w-full animate-pop outline-none", className)}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute -top-13 end-0 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-accent-500 hover:text-brand-950"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
