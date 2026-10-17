import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock, Menu, PhoneCall, X } from "lucide-react";
import { BRAND, CONTACT, NAV_ITEMS } from "@/data/site";
import { isDialable, telHref } from "@/lib/format";
import { cn } from "@/utils/cn";
import { BrandLockup } from "./BrandLockup";
import { ButtonLink } from "@/components/website/ui/Button";
import { Container } from "@/components/website/ui/Container";
import { PhoneNumber } from "@/components/website/ui/PhoneNumber";
import { PlaceholderBadge } from "@/components/website/ui/PlaceholderBadge";

interface HeaderProps {
  activeId: string;
}

export function Header({ activeId }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Compact, shadowed header after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile drawer: scroll lock, Escape to close, focus management.
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", onKeyDown);
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [menuOpen]);

  // Close the drawer if the viewport grows into the desktop layout.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const emergencyHref = telHref(CONTACT.emergency.tel);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-slate-200/80 bg-white/90 shadow-lg shadow-brand-950/5 backdrop-blur-lg"
            : "border-transparent bg-white"
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-[4.25rem]" : "h-20"
          )}
        >
          <a href="#home" aria-label={`${BRAND.fullName} — صفحه اصلی`} className="shrink-0">
            <BrandLockup />
          </a>

          <nav aria-label="ناوبری اصلی" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "group relative block rounded-full px-3.5 py-2 text-[15px] font-bold transition-colors",
                        isActive ? "text-brand-700" : "text-slate-600 hover:text-brand-700"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 bottom-0 h-0.5 origin-center rounded-full bg-accent-500 transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={emergencyHref}
              variant="primary"
              size="md"
              leadingIcon={PhoneCall}
              className="hidden sm:inline-flex"
            >
              تماس اورژانس
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-slate-200 text-brand-700 transition hover:bg-brand-50 xl:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer lives outside <header> so its fixed positioning is never affected by the header's backdrop-filter. */}
      <div
        className={cn("fixed inset-0 z-[60] xl:hidden", !menuOpen && "pointer-events-none")}
        inert={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی"
          className={cn(
            "absolute inset-y-0 start-0 flex w-[min(22rem,90vw)] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
            <BrandLockup />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-accent-100"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="منوی موبایل" className="flex-1 p-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-5 w-1 -skew-x-[22deg] rounded-full transition",
                            isActive ? "bg-accent-500" : "bg-slate-200"
                          )}
                        />
                        {item.label}
                      </span>
                      <ArrowLeft className="size-4 text-slate-400" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-4 border-t border-slate-100 bg-paper p-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Clock className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
              <span>
                {CONTACT.hours[0].label}: {CONTACT.hours[0].value}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PhoneNumber className="text-lg font-extrabold text-brand-700">
                {CONTACT.emergency.display}
              </PhoneNumber>
              {!isDialable(CONTACT.emergency.tel) && <PlaceholderBadge />}
            </div>
            <ButtonLink
              href={emergencyHref}
              onClick={() => setMenuOpen(false)}
              variant="primary"
              size="lg"
              leadingIcon={PhoneCall}
              className="w-full"
            >
              تماس اورژانس
            </ButtonLink>
          </div>
        </aside>
      </div>
    </>
  );
}
