import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ABOUT_IMAGES, VALUES } from "@/data/content";
import { BRAND } from "@/data/site";
import { ButtonLink } from "@/components/website/ui/Button";
import { Container } from "@/components/website/ui/Container";
import { Reveal } from "@/components/website/ui/Reveal";
import { SectionHeading } from "@/components/website/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Soft brand disc echoing the logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-linear-to-br from-brand-100/70 to-transparent"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ------------------------------ Text ------------------------------ */}
        <Reveal>
          <SectionHeading
            align="start"
            eyebrow="درباره ما"
            title="همراه شما در مسیر انتقال ایمن بیمار"
          />

          <div className="mt-6 space-y-4 text-base text-justify leading-9 text-slate-600 sm:text-lg">
            <p>
              <strong className="font-extrabold text-brand-700">{BRAND.fullName}</strong> {" "}
              ارائه دهنده خدمات آمبولانس خصوصی و حمل و نقل درمانی بیماران با رویکردی حرفه ای، سریع و ایمن است.
            </p>
            <p>
              این مجموعه با بهره گیری از ناوگان مجهز، نیروهای آموزش دیده و رعایت اصول استاندارد در انتقال بیماران، آماده خدمت رسانی به شهروندان، مراکز درمانی، شرکت ها، سازمان ها و خانواده ها می باشد.
            </p>
            <p>هدف اصلی این مجموعه، فراهم کردن خدمات حمل بیمار با بالاترین سطح ایمنی، پاسخگویی مناسب، حفظ کرامت بیمار و همراهی حرفه ای در تمامی مراحل اعزام و انتقال است.</p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl bg-paper p-4 ring-1 ring-slate-100">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-100">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-extrabold text-brand-950">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Verified credentials — placeholders until real data exists */}
          {/*     <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {CREDENTIALS.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border-2 border-dashed border-accent-300 bg-accent-50/60 p-4 text-center"
              >
                <dt className="text-sm font-bold text-slate-700">{item.label}</dt>
                <dd className="mt-1 text-lg font-extrabold text-accent-800">{item.value ?? "[ ثبت اطلاعات ]"}</dd>
                <p className="mt-0.5 text-xs text-slate-600">
                  {item.value ? item.hint : "اطلاعات تأییدشده در اینجا درج می‌شود"}
                </p>
              </div>
            ))}
          </dl> */}

          <ButtonLink href="#contact" variant="secondary" size="lg" trailingIcon={ArrowLeft} className="mt-10">
            تماس با ما
          </ButtonLink>
        </Reveal>

        {/* ----------------------------- Visual ----------------------------- */}
        <Reveal delay={150}>
          <div className="relative mx-auto w-full max-w-xl pb-14 sm:pb-16">
            <div
              aria-hidden="true"
              className="absolute -top-5 -right-3 size-44 rounded-full bg-linear-to-br from-accent-400 to-accent-500 opacity-90 sm:-right-6 sm:size-56"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 left-6 h-4 w-40 -rotate-[32deg] rounded-full bg-linear-to-r from-transparent to-brand-600"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-950/25 ring-8 ring-white sm:aspect-[5/6]">
              <img
                src={ABOUT_IMAGES.main}
                alt="کارشناس امدادی در کنار آمبولانس"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-0 -left-2 aspect-[5/4] w-[46%] overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl shadow-brand-950/25 sm:-left-8">
              <img
                src={ABOUT_IMAGES.secondary}
                alt="مراقبت از بیمار در فضای داخلی آمبولانس"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>

            <div className="absolute top-10 -left-2 flex items-center gap-3 rounded-2xl bg-white p-3.5 pe-5 shadow-xl shadow-brand-950/15 sm:-left-8">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-brand-950">ایمنی بیمار</p>
                <p className="text-xs text-slate-600">اولویت نخست در هر مأموریت</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
