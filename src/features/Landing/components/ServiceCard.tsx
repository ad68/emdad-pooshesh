import { ArrowLeft } from "lucide-react";
import type { Service } from "@/data/content";
import { toFaDigits } from "@/lib/format";

interface ServiceCardProps {
  service: Service;
  position: number;
  onRequest: (serviceTitle: string) => void;
}

export function ServiceCard({ service, position, onRequest }: ServiceCardProps) {
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

      <button
        type="button"
        onClick={() => onRequest(title)}
        className="relative mt-6 inline-flex items-center gap-2 self-start rounded-full py-1 font-bold text-brand-700 transition-colors hover:text-accent-700"
      >
        درخواست این خدمت
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
      </button>
    </article>
  );
}
