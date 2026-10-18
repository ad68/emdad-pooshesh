import { Camera, MessageCircle, Send, Video, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Central, easy-to-edit company configuration.                       */
/*  Replace every value marked "placeholder: true" with verified data. */
/* ------------------------------------------------------------------ */

export const BRAND = {
  fullName: "مرکز آمبولانس خصوصی امداد پوشش",
  nameLine1: "مرکز آمبولانس خصوصی",
  nameLine2: "امداد پوشش",
  description:
    "ارائهٔ خدمات انتقال ایمن بیمار با تمرکز بر آرامش بیمار و همراهان، دقت در اعزام و مراقبت حرفه‌ای در تمام طول مسیر.",
  /** Current Persian (Jalali) year, shown in the footer. */
  copyrightYear: new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date()),
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "صفحه اصلی" },
  { id: "about", label: "درباره ما" },
  { id: "services", label: "خدمات و تعرفه‌ها" },
  { id: "gallery", label: "گالری تصاویر" },
  { id: "videos", label: "گالری فیلم" },
  { id: "awards", label: "لوح‌های تقدیر" },
  { id: "contact", label: "تماس با ما" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export interface PhoneEntry {
  label: string;
  /** Text shown to visitors. */
  display: string;
  /** International format, e.g. "+982112345678". Leave empty until the real number is known. */
  tel: string;
}

export const CONTACT = {
  /** Main emergency line — used by every "call" button on the site. */
  emergency: {
    label: "خط اورژانس و اعزام",
    display: "021-88541848",
    tel: "021-88541848",
  } satisfies PhoneEntry,

  phones: [
    { label: "خط اورژانس و اعزام", display: "021-88541848", tel: "021-88541848" },
    { label: "اورژانس", display: "021-88541848", tel: "021-88541848" },
    { label: "پشتیبانی (همراه)", display: "0996-5550358", tel: "0996-5550358" },

  ] satisfies PhoneEntry[],

  address: {
    value: "یوسف آباد - خیابان اسدآبادی - خیابان چهارم - پلاک 44- طبقه اول واحد 1",
    placeholder: true,
  },

  email: {
    value: "emdadpooshesh@gmail.com",
    placeholder: true,
  },

  hours: [
    { label: "اعزام آمبولانس", value: "همه روزه، شبانه‌روزی", placeholder: true },
    { label: "امور اداری و تعرفه", value: "شنبه تا چهارشنبه، ۰۸:۰۰ تا ۱۶:۰۰", placeholder: true },
  ],

  /** Paste a Google Maps / Neshan embed URL here to replace the map placeholder. */
  mapEmbedUrl: "",
};

export interface SocialLink {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Leave empty until the real profile URL is known. */
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram", label: "اینستاگرام", icon: Camera, href: "Emdadpooshesh@gmail.com"
  },
  /*   { id: "telegram", label: "تلگرام", icon: Send, href: "" },
    { id: "whatsapp", label: "واتس‌اپ", icon: MessageCircle, href: "" },
    { id: "aparat", label: "آپارات", icon: Video, href: "" }, */
];
