import type { ReactNode } from "react";
import { Clock, Mail, MapPin, PhoneCall, type LucideIcon } from "lucide-react";
import { CONTACT } from "@/data/site";
import { isDialable, telHref } from "@/lib/format";
import { ContactForm, type ContactPrefill } from "./ContactForm";
import { MapPlaceholder } from "./MapPlaceholder";
import { ButtonLink } from "@/components/website/ui/Button";
import { Container } from "@/components/website/ui/Container";
import { PhoneNumber } from "@/components/website/ui/PhoneNumber";
import { PlaceholderBadge } from "@/components/website/ui/PlaceholderBadge";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";

function InfoCard({ icon: Icon, title, badge, children }: { icon: LucideIcon; title: string; badge?: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-bold text-slate-600">{title}</h3>
          {badge && <PlaceholderBadge />}
        </div>
        <div className="mt-1.5 text-base leading-8 font-semibold text-brand-950">{children}</div>
      </div>
    </div>
  );
}

interface ContactProps {
  prefill: ContactPrefill | null;
}

export function Contact({ prefill }: ContactProps) {
  const otherPhones = CONTACT.phones.slice(1);

  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-teal [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="تماس با ما"
            title="هر زمان نیاز داشتید، در کنار شما هستیم"
            description="برای اعزام آمبولانس، دریافت تعرفه یا هر پرسش دیگری با ما در ارتباط باشید."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* --------------------------- Contact details --------------------------- */}
          <Reveal className="space-y-4 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 to-brand-800 p-6 text-white shadow-xl shadow-brand-600/25 sm:p-7">
              <span aria-hidden="true" className="absolute top-8 -left-12 h-4 w-52 -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-accent-500/80" />
              <span aria-hidden="true" className="absolute top-16 -left-16 h-2 w-52 -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-white/50" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="flex items-center gap-2 text-sm font-bold text-accent-200">
                    <PhoneCall className="size-4" aria-hidden="true" />
                    {CONTACT.emergency.label}
                  </p>

                </div>
                <PhoneNumber className="mt-2 text-3xl font-extrabold sm:text-4xl">{CONTACT.emergency.display}</PhoneNumber>
                <ButtonLink
                  href={telHref(CONTACT.emergency.tel)}
                  variant="primary"
                  size="lg"
                  leadingIcon={PhoneCall}
                  className="mt-5 w-full sm:w-auto"
                >
                  تماس فوری با مرکز
                </ButtonLink>
              </div>
            </div>

            <InfoCard icon={PhoneCall} title="سایر شماره‌های تماس" badge={otherPhones.some((phone) => !isDialable(phone.tel))}>
              <ul className="space-y-1">
                {otherPhones.map((phone) => (
                  <li key={phone.label} className="flex flex-wrap items-center justify-between gap-x-4">
                    <span className="text-sm font-medium text-slate-600">{phone.label}</span>
                    <a href={telHref(phone.tel)} className="transition-colors hover:text-accent-700">
                      <PhoneNumber>{phone.display}</PhoneNumber>
                    </a>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard icon={MapPin} title="نشانی" badge={CONTACT.address.placeholder}>
              {CONTACT.address.value}
            </InfoCard>

            <InfoCard icon={Mail} title="ایمیل" badge={CONTACT.email.placeholder}>
              {CONTACT.email.placeholder ? (
                <PhoneNumber>{CONTACT.email.value}</PhoneNumber>
              ) : (
                <a href={`mailto:${CONTACT.email.value}`} className="transition-colors hover:text-accent-700">
                  <PhoneNumber>{CONTACT.email.value}</PhoneNumber>
                </a>
              )}
            </InfoCard>

            <InfoCard icon={Clock} title="ساعات کاری" badge={CONTACT.hours.some((item) => item.placeholder)}>
              <ul className="space-y-1">
                {CONTACT.hours.map((item) => (
                  <li key={item.label} className="flex flex-wrap items-center justify-between gap-x-4">
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    <span className="text-[15px]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </Reveal>

          {/* ------------------------------ Form ------------------------------ */}
          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm prefill={prefill} />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <MapPlaceholder />
        </Reveal>
      </Container>
    </section>
  );
}
