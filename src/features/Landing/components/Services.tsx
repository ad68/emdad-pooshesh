import { SERVICES } from "@/data/content";
import { ServiceCard } from "./ServiceCard";
import { TariffTable } from "./TariffTable";
import { Container } from "@/components/website/ui/Container";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";

interface ServicesProps {
  /** Called when a visitor asks for a service; the contact form uses it as the subject. */
  onRequestService: (serviceTitle: string) => void;
}

export function Services({ onRequestService }: ServicesProps) {
  return (
    <section id="services" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-teal [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="خدمات و تعرفه‌ها"
            title="خدمات انتقال و اعزام آمبولانس"
            description="هر خدمت متناسب با شرایط بیمار و نیاز شما طراحی شده است. برای ثبت درخواست، خدمت موردنظر را انتخاب کنید."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <li key={service.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <ServiceCard service={service} position={i + 1} onRequest={onRequestService} />
              </Reveal>
            </li>
          ))}
        </ul>

        <TariffTable />
      </Container>
    </section>
  );
}
