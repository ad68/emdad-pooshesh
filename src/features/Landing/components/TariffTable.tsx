import { PhoneCall } from "lucide-react";
import { ALL_SERVICES } from "@/data/content";
import { CONTACT } from "@/data/site";
import { formatToman, telHref } from "@/lib/format";
import { ButtonLink } from "@/components/website/ui/Button";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";



export function TariffTable() {
  return (
    <>
      <div id="tariffs" className="mt-20 scroll-mt-28 sm:mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="تعرفه‌ها"
            title="جدول تعرفهٔ خدمات"
            description="مبلغ هر خدمت پس از تأیید رسمی در این جدول درج می‌شود. تا آن زمان، برای اطلاع از هزینهٔ دقیق می‌توانید استعلام بگیرید."
          />
        </Reveal>

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-brand-950/5">
            <div className="hidden grid-cols-[1fr_15rem_9.5rem] gap-4 bg-brand-700 px-8 py-4 text-sm font-bold text-white md:grid">
              <span>خدمت</span>
              <span>تعرفه معاونت درمان</span>
              {/*   <span>تعرفه آزاد</span> */}
            </div>

            <ul className="divide-y divide-slate-100">
              {ALL_SERVICES.map(({ id, icon: Icon, title, tariffNote, price, unit }) => (
                <li
                  key={id}
                  className="grid items-center gap-4 px-5 py-5 transition-colors hover:bg-brand-50/50 sm:px-8 md:grid-cols-[1fr_15rem_9.5rem]"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="text-xs lg:text-base font-extrabold text-brand-950">{title}</h4>
                      <p className="text-sm leading-7 text-slate-600">{tariffNote}</p>
                    </div>
                  </div>

                  {price !== null ? (
                    <p className="flex flex-col">
                      <span className="xl:text-xl font-extrabold text-brand-700">{formatToman(price)}</span>
                      <span className="text-xs text-slate-600">{unit}</span>
                    </p>
                  ) : (
                    <p className="inline-flex w-fit flex-col rounded-2xl border-2 border-dashed border-accent-300 bg-accent-50 px-4 py-2">
                      <span className="text-sm font-extrabold text-accent-800">[ مبلغ تعرفه ]</span>
                      <span className="text-xs text-accent-800">{unit} · قابل ویرایش</span>
                    </p>
                  )}

                  {/*  {freePrice ? (
                    <p className="flex flex-col">
                      <span className="text-xl font-extrabold text-brand-700">{formatToman(freePrice)}</span>
                      <span className="text-xs text-slate-600">{unit}</span>
                    </p>
                  ) : (
                    <p className="inline-flex w-fit flex-col rounded-2xl border-2 border-dashed border-accent-300 bg-accent-50 px-4 py-2">
                      <span className="text-sm font-extrabold text-accent-800">[ مبلغ تعرفه ]</span>
                      <span className="text-xs text-accent-800">{unit} · قابل ویرایش</span>
                    </p>
                  )} */}

                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-slate-100 bg-paper px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

              <ButtonLink
                href={telHref(CONTACT.emergency.tel)}
                variant="secondary"
                size="sm"
                leadingIcon={PhoneCall}
                className="self-start sm:self-auto"
              >
                تماس برای استعلام
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>

    </>

  );
}
