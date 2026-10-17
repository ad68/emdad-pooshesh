import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Pause, PhoneCall, Play } from "lucide-react";
import { HERO_SLIDES } from "@/data/content";
import { CONTACT } from "@/data/site";
import { telHref, toFaDigits } from "@/lib/format";
import { cn } from "@/utils/cn";
import { ButtonLink } from "@/components/website/ui/Button";
import { Container } from "@/components/website/ui/Container";
import { PhoneNumber } from "@/components/website/ui/PhoneNumber";

import { StripeAccent } from "@/components/website/ui/StripeAccent";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 50;

export function Hero() {
  const count = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((target: number) => setIndex(((target % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((current) => (current + 1) % count), [count]);
  const previous = useCallback(() => setIndex((current) => (current - 1 + count) % count), [count]);

  // Autoplay: paused by the user, on mouse hover, on keyboard focus, or with reduced motion.
  useEffect(() => {
    if (userPaused || interacting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [userPaused, interacting, index, next]);

  // RTL: the left arrow moves forward, the right arrow moves back.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") next();
    if (event.key === "ArrowRight") previous();
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;
    // Dragging towards the left reveals the next slide in RTL.
    if (delta < -SWIPE_THRESHOLD) next();
    if (delta > SWIPE_THRESHOLD) previous();
  };

  const emergencyHref = telHref(CONTACT.emergency.tel);


  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="اسلایدر معرفی مرکز"
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => event.pointerType === "mouse" && setInteracting(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setInteracting(false)}
      onFocus={(event) => event.target.matches(":focus-visible") && setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative isolate touch-pan-y overflow-hidden bg-brand-950 text-white"
    >
      {/* ----------------------- Background slides ----------------------- */}
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              fetchPriority={i === 0 ? "high" : "auto"}
              draggable={false}
              className={cn(
                "size-full object-cover transition-transform duration-[9000ms] ease-out",
                i === index ? "scale-110" : "scale-100"
              )}
            />
          </div>
        ))}
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-brand-950/75 lg:hidden" />
        <div className="absolute inset-0 hidden bg-linear-to-l from-brand-950/95 via-brand-950/75 to-brand-950/25 lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand-950/70 to-transparent" />
      </div>

      {/* Speed-trail motif inspired by the logo's arrows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block">
        <span className="absolute top-[16%] -left-16 h-5 w-[32rem] -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-accent-500/80" />
        <span className="absolute top-[27%] -left-28 h-2.5 w-[34rem] -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-brand-300/70" />
        <span className="absolute top-[36%] -left-10 h-5 w-[28rem] -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-accent-500/60" />
      </div>

      {/* --------------------------- Content --------------------------- */}
      <Container className="relative z-10 grid items-center gap-10 pt-14 pb-44 sm:pt-20 lg:min-h-[46rem] lg:grid-cols-12 lg:pb-48">
        <div className="lg:col-span-7">
          <div className="grid" aria-live={userPaused || interacting ? "polite" : "off"}>
            {HERO_SLIDES.map((slide, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              const isActive = i === index;
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${toFaDigits(i + 1)} از ${toFaDigits(count)}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className={cn(
                    "col-start-1 row-start-1 transition-all duration-700 ease-out",
                    isActive
                      ? "translate-y-0 opacity-100 delay-300"
                      : "pointer-events-none translate-y-6 opacity-0"
                  )}
                >
                  <p className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 ps-3 pe-4 text-sm font-bold text-white backdrop-blur">
                    <StripeAccent onDark />
                    {slide.eyebrow}
                  </p>
                  <Heading className="mt-5 max-w-2xl text-4xl leading-[1.35] font-extrabold text-balance sm:text-5xl lg:text-6xl lg:leading-[1.3]">
                    {slide.title}
                  </Heading>
                  <p className="mt-5 max-w-xl text-base leading-8 text-white/90 sm:text-lg sm:leading-9">
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={emergencyHref}
              variant="primary"
              size="lg"
              leadingIcon={PhoneCall}
              className="w-full sm:w-auto"
            >
              تماس با مرکز
            </ButtonLink>
            <ButtonLink
              href="#services"
              variant="outlineLight"
              size="lg"
              trailingIcon={ArrowLeft}
              className="w-full sm:w-auto"
            >
              مشاهده خدمات
            </ButtonLink>
          </div>
        </div>

        {/* Emergency contact card */}
        <aside aria-label="تماس اورژانس" className="hidden justify-end lg:col-span-5 lg:flex">
          <div className="w-full max-w-sm animate-float rounded-[2rem] border border-white/25 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-500 text-brand-950">
                <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-2xl bg-accent-500" />
                <PhoneCall className="relative size-7" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/85">{CONTACT.emergency.label}</p>
                <PhoneNumber className="text-2xl font-extrabold text-white">{CONTACT.emergency.display}</PhoneNumber>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4 text-sm text-white/90">
              <Clock className="size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <span>
                {CONTACT.hours[0].label}: {CONTACT.hours[0].value}
              </span>
            </div>

            <ButtonLink href={emergencyHref} variant="primary" size="md" leadingIcon={PhoneCall} className="mt-5 w-full">
              تماس فوری
            </ButtonLink>


          </div>
        </aside>
      </Container>

      {/* --------------------------- Controls --------------------------- */}
      <div className="absolute inset-x-0 bottom-[4.75rem] z-20">
        <Container className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="اسلاید قبلی"
              className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-brand-800"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="اسلاید بعدی"
              className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-brand-800"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex items-center" aria-label="انتخاب اسلاید">
            {HERO_SLIDES.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`نمایش اسلاید ${toFaDigits(i + 1)}`}
                  aria-current={i === index}
                  className="group flex h-8 items-center px-1"
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-500",
                      i === index ? "w-10 bg-accent-500" : "w-2.5 bg-white/60 group-hover:bg-white"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setUserPaused((value) => !value)}
            aria-label={userPaused ? "پخش خودکار اسلایدها" : "توقف پخش خودکار اسلایدها"}
            className="grid size-9 place-items-center rounded-full text-white/85 transition hover:bg-white/15 hover:text-white"
          >
            {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>

          <p className="ms-auto text-sm font-bold text-white/90 tabular-nums" aria-hidden="true">
            {toFaDigits(String(index + 1).padStart(2, "0"))}
            <span className="mx-1 text-white/50">/</span>
            {toFaDigits(String(count).padStart(2, "0"))}
          </p>
        </Container>
      </div>
    </section>
  );
}
