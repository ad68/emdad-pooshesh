import { type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CircleAlert, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SERVICES } from "@/data/content";
import { CONTACT } from "@/data/site";
import { telHref, toEnDigits } from "@/lib/format";

import { cn } from "@/utils/cn";
import { Button } from "@/components/website/ui/Button";



const EMPTY_VALUES: FormValues = { name: "", phone: "", subject: "", message: "", attendantPhone: "" };

const SUBJECT_OPTIONS = [
  ...SERVICES.map((service) => service.title),
];

const PHONE_PATTERN = /^(?:(?:\+98|0098|0)?9\d{9}|0[1-8]\d{9})$/;

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "لطفاً نام و نام خانوادگی بیمار خود را وارد کنید.")
    .min(3, "نام واردشده بسیار کوتاه است."),
  phone: z
    .string()
    .transform((value) => toEnDigits(value).replace(/[\s\-()]/g, ""))
    .pipe(
      z
        .string()
        .min(1, "لطفاً شمارهٔ تماس بیمار خود را وارد کنید.")
        .refine((value) => !value || PHONE_PATTERN.test(value), {
          message: "شمارهٔ تماس معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۲۱۱۲۳۴۵۶۷۸",
        })
    ),
  attendantPhone: z
    .string()
    .transform((value) => toEnDigits(value).replace(/[\s\-()]/g, ""))
    .pipe(
      z
        .string()
        .min(1, "لطفاً شمارهٔ تماس همراه بیمار خود را وارد کنید.")
        .refine((value) => !value || PHONE_PATTERN.test(value), {
          message: "شمارهٔ تماس معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۲۱۱۲۳۴۵۶۷۸",
        })
    ),

  subject: z.string().min(1, "لطفاً موضوع درخواست را انتخاب کنید."),
  message: z
    .string()
    .trim()
    .min(1, "لطفاً متن پیام خود را بنویسید.")
    .min(10, "متن پیام باید دست‌کم ۱۰ نویسه باشد."),
});

type FormValues = z.input<typeof contactFormSchema>;


interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-brand-950">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-red-700">
          <CircleAlert className="mt-1 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyles = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border bg-white px-4 text-base text-slate-800 transition outline-none placeholder:text-slate-400",
    "focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15",
    hasError ? "border-red-500 bg-red-50/40" : "border-slate-300 hover:border-slate-400"
  );



export function ContactForm() {

  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY_VALUES,
  });
  const selectedSubject = watch("subject");


  const onSubmit = async (values: FormValues) => {

    console.log('values', values)
  };




  const describedBy = (field: keyof FormValues) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="فرم تماس با مرکز"
      className="rounded-3xl bg-white p-6 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:p-8"
    >
      <h3 className="text-2xl font-extrabold text-brand-950">درخواست خدمت</h3>
      <p className="mt-1 text-slate-600">فرم زیر را تکمیل کنید تا همکاران ما با شما در ارتباط باشند.</p>

      <p className="mt-5 flex items-start gap-3 rounded-2xl bg-accent-50 p-4 text-sm leading-7 text-accent-900">
        <PhoneCall className="mt-1 size-4 shrink-0 text-accent-700" aria-hidden="true" />
        <span>
          در شرایط اورژانسی از این فرم استفاده نکنید؛{" "}
          <a href={telHref(CONTACT.emergency.tel)} className="font-extrabold underline underline-offset-4">
            همین حالا تماس بگیرید
          </a>
          .
        </span>
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="نام و نام خانوادگی بیمار" error={errors.name?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="مثلاً: علی رضایی"
            className={cn(inputStyles(Boolean(errors.name)), "h-12")}
          />
        </Field>

        <Field id="contact-phone" label="شمارهٔ تماس بیمار" error={errors.phone?.message}>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            {...register("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            className={cn(inputStyles(Boolean(errors.phone)), "h-12 text-right")}
          />
        </Field>
      </div>
      <div className="mt-6 grid gap-5 grid-cols-1">
        <Field id="attendant-phone" label="شمارهٔ تماس همراه بیمار" error={errors.attendantPhone?.message}>
          <input
            id="attendant-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            {...register("attendantPhone")}
            aria-invalid={Boolean(errors.attendantPhone)}
            aria-describedby={describedBy("attendantPhone")}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            className={cn(inputStyles(Boolean(errors.attendantPhone)), "h-12 text-right")}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="contact-subject" label="موضوع درخواست" error={errors.subject?.message}>
          <div className="relative">
            <select
              id="contact-subject"
              {...register("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={describedBy("subject")}
              className={cn(inputStyles(Boolean(errors.subject)), "h-12 appearance-none pe-12", !selectedSubject && "text-slate-400")}
            >
              <option value="" disabled>
                موضوع را انتخاب کنید
              </option>
              {SUBJECT_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-slate-800">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-message" label="شرح حال مختصر بیمار" error={errors.message?.message}>
          <textarea
            id="contact-message"
            rows={5}
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            placeholder="توضیح مختصری دربارهٔ شرح حال بیمار خود بنویسید"
            className={cn(inputStyles(Boolean(errors.message)), "resize-y py-3 leading-8")}
          />
        </Field>
      </div>


      <Button
        type="submit"
        variant="secondary"
        size="lg"

        className="mt-6 w-full"
      >
        ارسال پیام
      </Button>
    </form>
  );
}
