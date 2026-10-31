
import type { Service } from "@/data/content";
import { toFaDigits } from "@/lib/format";

interface ServiceCardProps {
  service: Service;
  position: number;

}

export function ServiceCard({ service, position }: ServiceCardProps) {
  const { icon: Icon, title, description } = service;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-600/10">
      <span
        aria-hidden="true"
        className="absolute -top-12 -left-12 size-32 rounded-full bg-brand-50 transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-brand-100/70"
      />
      <span
        aria-hidden="true"
        className="absolute top-5 left-6 text-sm font-extrabold text-brand-300 tabular-nums"
      >
        {toFaDigits(String(position).padStart(2, "0"))}
      </span>

      <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-brand-950">
        <Icon className="size-7" aria-hidden="true" />
      </span>

      <h3 className="relative mt-6 xl:text-xl font-extrabold text-brand-950">{title}</h3>
      <p className="relative mt-3 flex-1 text-[15px] leading-8 text-slate-600">{description}</p>


    </article>
  );
}
