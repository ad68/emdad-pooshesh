import { Clock, Mail, PhoneCall } from "lucide-react";
import { CONTACT } from "@/data/site";
import { telHref } from "@/lib/format";
import { Container } from "@/components/website/ui/Container";
import { PhoneNumber } from "@/components/website/ui/PhoneNumber";

/** Slim utility bar above the header (desktop / tablet only). */
export function TopBar() {
  return (
    <div className="hidden bg-brand-900 text-sm text-white md:block">
      <Container className="flex h-11 items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-white/90">
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-accent-300" aria-hidden="true" />
            <span>
              {CONTACT.hours[0].label}: {CONTACT.hours[0].value}
            </span>
          </span>
          <span className="hidden items-center gap-2 lg:flex">
            <Mail className="size-4 text-accent-300" aria-hidden="true" />
            <PhoneNumber>{CONTACT.email.value}</PhoneNumber>
          </span>
        </div>

        <a
          href={telHref(CONTACT.emergency.tel)}
          className="flex items-center gap-2 font-bold text-white transition hover:text-accent-300"
        >
          <PhoneCall className="size-4 text-accent-300" aria-hidden="true" />
          <span>{CONTACT.emergency.label}:</span>
          <PhoneNumber>{CONTACT.emergency.display}</PhoneNumber>
        </a>
      </Container>
    </div>
  );
}
