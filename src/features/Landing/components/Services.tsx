import { SERVICES } from "@/data/content";
import { ServiceCard } from "./ServiceCard";
import { TariffTable } from "./TariffTable";
import { Container } from "@/components/website/ui/Container";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";



export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-teal [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="خدمات و تعرفه‌ها"
            title="خدمات آمبولانس خصوصی در تهران"
            description="امداد پوشش به‌صورت شبانه‌روزی در تمام مناطق تهران آمبولانس اعزام می‌کند. خدمات انتقال بیمار متناسب با شرایط بیمار و نیاز شما ارائه می‌شود؛ برای هماهنگی و استعلام تعرفه تماس بگیرید."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <li key={service.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <ServiceCard service={service} position={i + 1} />
              </Reveal>
            </li>
          ))}
        </ul>

        <TariffTable />
      </Container>
    </section>
  );
}
