import { ArrowUp, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { BRAND, CONTACT, NAV_ITEMS, SOCIAL_LINKS } from "@/data/site";
import { telHref } from "@/lib/format";
import { BrandLockup } from "./BrandLockup";
import { Container } from "@/components/website/ui/Container";
import { PhoneNumber } from "@/components/website/ui/PhoneNumber";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-600 pb-24 text-white lg:pb-0">
      {/* Restrained orange accent line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-l from-accent-500 via-accent-500/40 to-transparent" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-brand-700/60" />

      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <BrandLockup tone="light" />
          <p className="mt-5 max-w-sm leading-8 text-white/90">{BRAND.description}</p>

          <h2 className="mt-8 text-sm font-extrabold text-white">شبکه‌های اجتماعی</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map(({ id, label, icon: Icon, href }) => (
              <li key={id}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-brand-700"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </a>
                ) : (
                  <span
                    title="پیوند این شبکه پس از ثبت فعال می‌شود"
                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 px-4 py-2 text-sm text-white/90"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>

        </div>

        {/* Quick links */}
        <nav aria-label="دسترسی سریع" className="lg:col-span-3 lg:ps-6">
          <h2 className="text-lg font-extrabold">دسترسی سریع</h2>
          <span aria-hidden="true" className="mt-2 block h-1 w-10 rounded-full bg-accent-500" />
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 lg:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group inline-flex items-center gap-2 py-1.5 text-white/90 transition hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-1 -skew-x-[22deg] rounded-full bg-white/40 transition-colors group-hover:bg-accent-500"
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-5">
          <h2 className="text-lg font-extrabold">اطلاعات تماس</h2>
          <span aria-hidden="true" className="mt-2 block h-1 w-10 rounded-full bg-accent-500" />
          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-200">
                <PhoneCall className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-white/90">{CONTACT.emergency.label}</p>
                <a href={telHref(CONTACT.emergency.tel)} className="text-lg font-extrabold transition hover:text-accent-200">
                  <PhoneNumber>{CONTACT.emergency.display}</PhoneNumber>
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-200">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <p className="pt-1.5 leading-8 text-white/90">{CONTACT.address.value}</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-200">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <p className="pt-1.5 text-white/90">
                <PhoneNumber>{CONTACT.email.value}</PhoneNumber>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-200">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <p className="pt-1.5 leading-8 text-white/90">
                {CONTACT.hours[0].label}: {CONTACT.hours[0].value}
              </p>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/20">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 text-sm text-white/90 sm:flex-row">
          <p className="text-center">
            © {BRAND.copyrightYear} {BRAND.fullName}. تمامی حقوق محفوظ است.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold transition hover:bg-white hover:text-brand-700"
          >
            بازگشت به بالا
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
