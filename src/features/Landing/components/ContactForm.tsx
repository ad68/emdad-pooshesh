import { useEffect, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, CircleAlert, PhoneCall, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CONTACT } from "@/data/site";
import { telHref, toEnDigits } from "@/lib/format";
import { Turnstile } from '@marsidev/react-turnstile';
import { cn } from "@/utils/cn";
import { Button } from "@/components/website/ui/Button";
import axios from "axios";



const EMPTY_VALUES: FormValues = { patientFullName: "", patientPhone: "", serviceType: "", patientConditionSummary: "", patientCompanionPhone: "", address: "" };


export const servicesOptions = [
  {
    value: "PRIVATE_AMBULANCE",
    title: "آمبولانس خصوصی",

  },
  {
    value: "INTER_FACILITY_TRANSFER",
    title: "انتقال بیمار بین مراکز درمانی",

  },
  {
    value: "HOME_TRANSFER",
    title: "انتقال بیمار به منزل",

  },
  {
    value: "INTERCITY_AMBULANCE",
    title: "آمبولانس بین‌شهری",

  },
  {
    value: "ELDERLY_TRANSFER",
    title: "انتقال بیماران سالمند",

  },
  {
    value: "EVENT_AMBULANCE",
    title: "اعزام آمبولانس به مراسم و رویدادها",

  },
];
const PHONE_PATTERN = /^(?:(?:\+98|0098|0)?9\d{9}|0[1-8]\d{9})$/;

const contactFormSchema = z.object({
  patientFullName: z
    .string()
    .trim()
    .min(1, "لطفاً نام و نام خانوادگی بیمار خود را وارد کنید.")
    .min(3, "نام واردشده بسیار کوتاه است."),
  patientPhone: z
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
  patientCompanionPhone: z
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

  serviceType: z.string().min(1, "لطفاً موضوع درخواست را انتخاب کنید."),
  patientConditionSummary: z
    .string()
    .trim()
    .min(1, "لطفاً متن پیام خود را بنویسید.")
    .min(5, "متن پیام باید دست‌کم 5 کاراکتر باشد."),
  address: z
    .string()
    .trim()
    .min(1, "لطفاً آدرس خود را بنویسید.")
    .min(5, "متن آدرس باید دست‌کم 5 کاراکتر باشد."),
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
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY_VALUES,
  });
  const [token, setToken] = useState<string>('')
  const [actionLoading, setActionLoading] = useState(false)
  const [notification, setNotification] = useState<"success" | "error" | null>(null);
  const selectedSubject = watch("serviceType");

  useEffect(() => {
    if (!notification) return;

    const timeoutId = window.setTimeout(() => setNotification(null), 10000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;

    console.log("Cloudflare Site Key:", siteKey);
  }, [])

  const onSubmit = (values: FormValues) => {
    setActionLoading(true);
    axios
      .post("/api/verify-turnstile", { token })
      .then(() => {
        return axios.post(
          "https://api.bakapp.ir/bakapp/api/ambulance-request/add",
          values
        );
      })
      .then(() => {
        reset(EMPTY_VALUES);
        setNotification("success");
      })
      .catch(() => {
        setNotification("error");
      })
      .finally(() => {
        setActionLoading(false);
      });
  };
  const describedBy = (field: keyof FormValues) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="فرم تماس با مرکز"
      className="rounded-3xl bg-white p-6 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:p-8"
    >
      {notification && (
        <div
          role={notification === "success" ? "status" : "alert"}
          aria-live={notification === "success" ? "polite" : "assertive"}
          className={cn(
            "fixed inset-x-4 top-4 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl border bg-white p-4 text-right shadow-2xl shadow-slate-950/15 animate-pop sm:inset-x-auto sm:end-6 sm:top-6",
            notification === "success" ? "border-emerald-200" : "border-red-200"
          )}
        >
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full",
              notification === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}
          >
            {notification === "success" ? (
              <CheckCircle2 className="size-6" aria-hidden="true" />
            ) : (
              <CircleAlert className="size-6" aria-hidden="true" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold text-brand-950">
              {notification === "success" ? "درخواست شما ثبت شد" : "ثبت درخواست انجام نشد"}
            </span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              {notification === "success"
                ? "کارشناسان ما ما در اسرع وقت با شما تماس می‌گیرند."
                : "خطایی رخ داد. لطفاً دوباره تلاش کنید."}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="بستن پیام"
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
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
        <Field id="contact-name" label="نام و نام خانوادگی بیمار" error={errors.patientFullName?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("patientFullName")}
            aria-invalid={Boolean(errors.patientFullName)}
            aria-describedby={describedBy("patientFullName")}
            placeholder="مثلاً: علی رضایی"
            className={cn(inputStyles(Boolean(errors.patientFullName)), "h-12")}
          />
        </Field>

        <Field id="contact-phone" label="شمارهٔ تماس بیمار" error={errors.patientPhone?.message}>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            {...register("patientPhone")}
            aria-invalid={Boolean(errors.patientPhone)}
            aria-describedby={describedBy("patientPhone")}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            className={cn(inputStyles(Boolean(errors.patientPhone)), "h-12 text-right")}
          />
        </Field>
      </div>
      <div className="mt-6 grid gap-5 grid-cols-1">
        <Field id="attendant-phone" label="شمارهٔ تماس همراه بیمار" error={errors.patientCompanionPhone?.message}>
          <input
            id="attendant-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            {...register("patientCompanionPhone")}
            aria-invalid={Boolean(errors.patientCompanionPhone)}
            aria-describedby={describedBy("patientCompanionPhone")}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            className={cn(inputStyles(Boolean(errors.patientCompanionPhone)), "h-12 text-right")}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="contact-subject" label="موضوع درخواست" error={errors.serviceType?.message}>
          <div className="relative">
            <select
              id="contact-subject"
              {...register("serviceType")}
              aria-invalid={Boolean(errors.serviceType)}
              aria-describedby={describedBy("serviceType")}
              className={cn(inputStyles(Boolean(errors.serviceType)), "h-12 appearance-none pe-12", !selectedSubject && "text-slate-400")}
            >
              <option value="" disabled>
                موضوع را انتخاب کنید
              </option>
              {servicesOptions.map((option, index) => (
                <option key={index} value={option.value} className="text-slate-800">
                  {option.title}
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
        <Field id="contact-message" label="شرح حال مختصر بیمار" error={errors.patientConditionSummary?.message}>
          <textarea
            id="contact-message"
            rows={5}
            {...register("patientConditionSummary")}
            aria-invalid={Boolean(errors.patientConditionSummary)}
            aria-describedby={describedBy("patientConditionSummary")}
            placeholder="توضیح مختصری دربارهٔ شرح حال بیمار خود بنویسید"
            className={cn(inputStyles(Boolean(errors.patientConditionSummary)), "resize-y py-3 leading-8")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="address" label="آدرس" error={errors.address?.message}>
          <textarea
            id="address"
            rows={5}
            {...register("address")}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={describedBy("address")}
            placeholder="آدرس خود را وارد کنید"
            className={cn(inputStyles(Boolean(errors.address)), "resize-y py-3 leading-8")}
          />
        </Field>
      </div>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
        onSuccess={(token) => setToken(token)}
        onError={(err) => console.log('err', err)}
        onExpire={() => setToken('')}
        options={{
          theme: 'light',
          language: 'fa',
        }}
      />

      <Button
        type="submit"
        variant="secondary"
        disabled={actionLoading || token?.length === 0}
        size="lg"
        className="mt-6 w-full"
      >
        {actionLoading ? "لطفا صبر کنید..." : "ارسال پیام"}

      </Button>
    </form>
  );
}

// components/ContactForm.tsx
/* 'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export function ContactForm() {
  const [token, setToken] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert('لطفاً تست امنیتی را کامل کنید.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

   
    const res = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email }),
    });

    const data = await res.json();
    if (data.success) {
      setStatus('فرم با موفقیت ارسال شد!');
    } else {
      setStatus('اعتبارسنجی کپچا ناموفق بود.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <input
        type="email"
        name="email"
        placeholder="ایمیل شما"
        required
        className="p-2 border rounded"
      />

      ویجت کپچای کلودفلر
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
        onSuccess={(token) => setToken(token)}
        onError={() => alert('خطا در بارگذاری کپچا')}
        onExpire={() => setToken('')}
        options={{
          theme: 'auto', 
          language: 'fa', 
        }}
      />

      <button
        type="submit"
        disabled={!token}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        ارسال فرم
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
} */
