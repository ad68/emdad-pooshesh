import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, PhoneCall, Send } from "lucide-react";
import { SERVICES } from "@/data/content";
import { CONTACT } from "@/data/site";
import { telHref, toEnDigits } from "@/lib/format";
import { submitContactForm, type ContactResult } from "@/services/contactService";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "@/components/website/ui/Button";
type FieldName = "name" | "phone" | "subject" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

export interface ContactPrefill {
  subject: string;
  /** Changes on every request so the same subject can be applied twice. */
  nonce: number;
}

const EMPTY_VALUES: FormValues = { name: "", phone: "", subject: "", message: "" };

const SUBJECT_OPTIONS = [
  ...SERVICES.map((service) => service.title),
  "استعلام تعرفه و قیمت",
  "سایر موارد",
];

const PHONE_PATTERN = /^(?:(?:\+98|0098|0)?9\d{9}|0[1-8]\d{9})$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "لطفاً نام و نام خانوادگی خود را وارد کنید.";
  else if (name.length < 3) errors.name = "نام واردشده بسیار کوتاه است.";

  const phone = toEnDigits(values.phone).replace(/[\s\-()]/g, "");
  if (!phone) errors.phone = "لطفاً شمارهٔ تماس خود را وارد کنید.";
  else if (!PHONE_PATTERN.test(phone))
    errors.phone = "شمارهٔ تماس معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۲۱۱۲۳۴۵۶۷۸";

  if (!values.subject) errors.subject = "لطفاً موضوع پیام را انتخاب کنید.";

  const message = values.message.trim();
  if (!message) errors.message = "لطفاً متن پیام خود را بنویسید.";
  else if (message.length < 10) errors.message = "متن پیام باید دست‌کم ۱۰ نویسه باشد.";

  return errors;
}

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

interface ContactFormProps {
  prefill: ContactPrefill | null;
}

export function ContactForm({ prefill }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "failed">("idle");
  const [result, setResult] = useState<ContactResult | null>(null);

  // A visitor clicked "request this service": pre-select the subject.
  useEffect(() => {
    if (!prefill) return;
    const subject = SUBJECT_OPTIONS.includes(prefill.subject) ? prefill.subject : "سایر موارد";
    setValues((current) => ({ ...current, subject }));
    setErrors((current) => ({ ...current, subject: undefined }));
    setStatus((current) => (current === "done" ? "idle" : current));
  }, [prefill]);

  const handleChange = (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error as soon as the visitor starts fixing the field.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleBlur = (field: FieldName) => () => {
    if (!values[field]) return;
    setErrors((current) => ({ ...current, [field]: validate(values)[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const outcome = await submitContactForm({
        name: values.name.trim(),
        phone: toEnDigits(values.phone).replace(/[\s\-()]/g, ""),
        subject: values.subject,
        message: values.message.trim(),
      });
      setResult(outcome);
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  const resetForm = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setResult(null);
    setStatus("idle");
  };

  if (status === "done" && result) {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl bg-brand-50 p-8 text-center sm:p-12">
        <span className="grid size-20 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
          <CircleCheck className="size-10" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-extrabold text-brand-950">
          {result.delivered ? "پیام شما ارسال شد" : "اطلاعات فرم شما تکمیل و بررسی شد"}
        </h3>
        <p className="max-w-md leading-8 text-slate-700">
          {result.delivered
            ? "همکاران ما در اولین فرصت با شما تماس خواهند گرفت."
            : "توجه: این فرم هنوز به سرویس دریافت پیام متصل نشده است و اطلاعات شما به جایی ارسال نشد. برای پیگیری فوری لطفاً با مرکز تماس بگیرید."}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {!result.delivered && (
            <ButtonLink href={telHref(CONTACT.emergency.tel)} variant="primary" leadingIcon={PhoneCall}>
              تماس با مرکز
            </ButtonLink>
          )}
          <Button variant="outline" onClick={resetForm}>
            ثبت پیام جدید
          </Button>
        </div>
      </div>
    );
  }

  const describedBy = (field: FieldName) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="فرم تماس با مرکز"
      className="rounded-3xl bg-white p-6 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:p-8"
    >
      <h3 className="text-2xl font-extrabold text-brand-950">ارسال پیام</h3>
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
        <Field id="contact-name" label="نام و نام خانوادگی" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="مثلاً: علی رضایی"
            className={cn(inputStyles(Boolean(errors.name)), "h-12")}
          />
        </Field>

        <Field id="contact-phone" label="شمارهٔ تماس" error={errors.phone}>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={values.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            className={cn(inputStyles(Boolean(errors.phone)), "h-12 text-right")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-subject" label="موضوع پیام" error={errors.subject}>
          <div className="relative">
            <select
              id="contact-subject"
              value={values.subject}
              onChange={handleChange("subject")}
              onBlur={handleBlur("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={describedBy("subject")}
              className={cn(inputStyles(Boolean(errors.subject)), "h-12 appearance-none pe-12", !values.subject && "text-slate-400")}
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
        <Field id="contact-message" label="متن پیام" error={errors.message}>
          <textarea
            id="contact-message"
            rows={5}
            value={values.message}
            onChange={handleChange("message")}
            onBlur={handleBlur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            placeholder="توضیح مختصری دربارهٔ درخواست خود بنویسید (مبدأ، مقصد، شرایط بیمار و ...)"
            className={cn(inputStyles(Boolean(errors.message)), "resize-y py-3 leading-8")}
          />
        </Field>
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید یا با مرکز تماس بگیرید.
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={status === "submitting"}
        leadingIcon={status === "submitting" ? LoaderCircle : Send}
        className="mt-6 w-full"
      >
        {status === "submitting" ? "در حال بررسی..." : "ارسال پیام"}
      </Button>
    </form>
  );
}
