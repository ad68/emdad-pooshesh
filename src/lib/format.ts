const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Converts Latin digits in a string/number to Persian digits. */
export function toFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/** Converts Persian and Arabic-Indic digits to Latin digits (useful before validation). */
export function toEnDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660));
}

/** Formats a number as Toman with Persian digits and separators. */
export function formatToman(amount: number): string {
  return `${new Intl.NumberFormat("fa-IR").format(amount)} تومان`;
}

/** A phone number is "dialable" only when it contains real digits (not a placeholder). */
export function isDialable(tel: string): boolean {
  return /^\+?\d{7,15}$/.test(tel.replace(/[\s-]/g, ""));
}

/**
 * Returns a tel: link for real numbers. While a number is still a placeholder
 * the link safely scrolls to the contact section instead of dialling nonsense.
 */
export function telHref(tel: string): string {
  return isDialable(tel) ? `tel:${tel.replace(/[\s-]/g, "")}` : "#contact";
}
