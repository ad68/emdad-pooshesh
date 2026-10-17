import { TRUST_ITEMS } from "@/data/content";
import { Container } from "@/components/website/ui/Container";
import { Reveal } from "@/components/website/ui/Reveal";

/** Four brand commitments overlapping the bottom edge of the hero. */
export function TrustStrip() {
  return (
    <section aria-label="تعهدات مرکز" className="relative z-20 -mt-12">
      <Container>
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-brand-950/15 ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="group flex items-start gap-4 bg-white p-5 transition-colors hover:bg-brand-50/60 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-brand-950">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
