import {
  Ambulance,
  BadgeCheck,
  CalendarCheck,
  Hospital,
  HeartHandshake,
  House,
  Route,
  ShieldCheck,
  Stethoscope,
  Timer,
  type LucideIcon,
  Hourglass,
  DoorStairwell,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  All page content lives here so it is easy to replace.              */
/*  Stock photos (Pexels) are SAMPLES — swap them for real photos.     */
/* ------------------------------------------------------------------ */

/** Builds a cropped Pexels image URL. Replace with your own image paths later. */
export const pexels = (id: number, width: number, height: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

/* ------------------------------ Hero ------------------------------ */

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: '/images/slider/slide-1.jpg',
    alt: "آمبولانس در مسیر شهری هنگام غروب",
    eyebrow: "آمبولانس خصوصی",
    title: "همراه مطمئن شما در لحظه‌های حساس",
    description:
      "با ناوگانی آماده و کادری مراقب، بیمار را ایمن و به‌موقع به مقصد می‌رسانیم؛ چون آرامش شما و عزیزانتان برای ما اولویت دارد.",
  },
  {
    id: "slide-2",
    image: '/images/slider/slide-2.jpg',
    alt: "امدادگران در حال انتقال بیمار با برانکارد",
    eyebrow: "انتقال ایمن بیمار",
    title: "ایمنی بیمار، پیش از هر مسیر",
    description:
      "از لحظهٔ اعزام تا تحویل در مرکز درمانی، هر مرحله با دقت، احترام و رعایت اصول ایمنی انجام می‌شود.",
  },
  {
    id: "slide-3",
    image: '/images/slider/slide-3.jpg',
    alt: "فضای داخلی مجهز آمبولانس",
    eyebrow: "تجهیزات و مراقبت",
    title: "مراقبتی حرفه‌ای در تمام طول مسیر",
    description:
      "فضای داخلی مجهز و منظم برای انتقال راحت‌تر و مطمئن‌تر بیماران، چه در مسیر کوتاه شهری و چه در سفر بین‌شهری.",
  },
  {
    id: "slide-4",
    image: '/images/slider/slide-4.jpg',
    alt: "ناوگان آمبولانس آماده اعزام",
    eyebrow: "ناوگان آماده",
    title: "اعزام سریع، هماهنگی دقیق",
    description:
      "با یک تماس، فرایند هماهنگی و اعزام آغاز می‌شود تا آمبولانس در کوتاه‌ترین زمان ممکن در کنار شما باشد.",
  },
];

/* --------------------------- Trust strip --------------------------- */

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TRUST_ITEMS: Highlight[] = [
  { icon: ShieldCheck, title: "ایمنی بیمار", description: "رعایت اصول ایمنی در تمام مراحل انتقال" },
  { icon: Stethoscope, title: "مراقبت حرفه‌ای", description: "همراهی دقیق و محترمانه با بیمار" },
  { icon: Timer, title: "اعزام به‌موقع", description: "هماهنگی سریع از لحظهٔ تماس شما" },
  { icon: HeartHandshake, title: "اعتماد و آرامش", description: "شفافیت در خدمات و پاسخ‌گویی" },
];

/* ----------------------- Services and tariffs ----------------------- */

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Short line used in the tariff table. */
  tariffNote: string;
  icon: LucideIcon;
  /** Price in Toman. Keep `null` until the official tariff is confirmed. */
  price: number | null;
  freePrice?: number | null;
  /** Unit shown next to the price, e.g. "هر سرویس". */
  unit: string;
}


export const SERVICES: Service[] = [
  {
    id: "private-ambulance",
    title: "آمبولانس خصوصی",
    description:
      "اعزام آمبولانس مجهز برای انتقال ایمن و راحت بیمار در سطح شهر، با هماهنگی سریع و همراهی کادر مراقبتی.",
    tariffNote: "انتقال درون‌شهری با آمبولانس مجهز",
    icon: Ambulance,
    price: null,
    unit: "هر سرویس",
  },
  {
    id: "inter-hospital",
    title: "انتقال بیمار بین مراکز درمانی",
    description:
      "جابه‌جایی بیمار میان بیمارستان‌ها، کلینیک‌ها و مراکز تصویربرداری با رعایت اصول ایمنی و هماهنگی کامل.",
    tariffNote: "بیمارستان، کلینیک و مراکز تشخیصی",
    icon: Hospital,
    price: null,
    unit: "هر سرویس",
  },
  {
    id: "home-transfer",
    title: "انتقال بیمار به منزل",
    description:
      "بازگرداندن بیمار از مرکز درمانی به منزل، با آرامش، مراقبت و جابه‌جایی دقیق در طول مسیر.",
    tariffNote: "ترخیص و بازگشت به منزل",
    icon: House,
    price: null,
    unit: "هر سرویس",
  },
  {
    id: "intercity",
    title: "آمبولانس بین‌شهری",
    description:
      "انتقال بیمار میان شهرها با برنامه‌ریزی مسیر، هماهنگی قبلی و آمادگی برای سفرهای طولانی.",
    tariffNote: "بر اساس مسیر و مدت سفر",
    icon: Route,
    price: null,
    unit: "بر اساس مسافت",
  },
  {
    id: "critical-care",
    title: "انتقال بیماران سالمند",
    description:
      "جا به جایی بیماران سالمند، کم توان یا نیازمند مراقبت ویژه",
    tariffNote: "مراقبت و پایش حین انتقال",
    icon: Stethoscope,
    price: null,
    unit: "هر سرویس",
  },
  {
    id: "events",
    title: "اعزام آمبولانس به مراسم و رویدادها",
    description:
      "پوشش درمانی و آمادگی اعزام برای همایش‌ها، مسابقات ورزشی، مراسم عمومی و برنامه‌های گروهی.",
    tariffNote: "بر اساس مدت حضور و نوع رویداد",
    icon: CalendarCheck,
    price: null,
    unit: "هر رویداد",
  },
];
export const ALL_SERVICES: Service[] = [
  {
    id: "private-ambulance",
    title: "اعزام آمبولانس تیپ A (معمولی)",
    description:
      "اعزام آمبولانس مجهز برای انتقال ایمن و راحت بیمار در سطح شهر، با هماهنگی سریع و همراهی کادر مراقبتی.",
    tariffNote: "جا به جایی پایه داخل شهری",
    icon: Ambulance,
    price: 3500000,
    freePrice: 3500000,
    unit: "ورودی",
  },
  {
    id: "inter-hospital",
    title: "اعزام آمبولانس تیپ B ",
    description:
      "جابه‌جایی بیمار میان بیمارستان‌ها، کلینیک‌ها و مراکز تصویربرداری با رعایت اصول ایمنی و هماهنگی کامل.",
    tariffNote: "دارای تجهیزات پیشرفته احیا (ICU/CCU)",
    icon: Ambulance,
    price: 4000000,
    freePrice: 4000000,
    unit: "ورودی",
  },
  {
    id: "inter-hospital-type-a",
    title: "بین شهری تیپ A (فقط رفت محاسبه می شود)",
    description: "",
    tariffNote: "آمبولانس تیپ A",
    icon: Route,
    price: 270000,
    freePrice: 370000,
    unit: "هر کیلومتر",
  },
  {
    id: "inter-hospital-type-b",
    title: "بین شهری تیپ B (فقط رفت محاسبه می شود)",
    description: "",
    tariffNote: "آمبولانس تیپ B",
    icon: Route,
    price: 300000,
    freePrice: 400000,
    unit: "هر کیلومتر",
  },
  {
    id: "ambulance-waiting-type-a",
    title: "توقف و انتظار آمبولانس تیپ A",
    description: "",
    tariffNote: "در صورت معطلی در مراکز درمان",
    icon: Hourglass,
    price: 355000,
    freePrice: 355000,
    unit: "بعد ساعت دوم",
  },
  {
    id: "ambulance-waiting-type-b",
    title: "توقف و انتظار آمبولانس تیپ B",
    description: "",
    tariffNote: "در صورت معطلی در مراکز درمان",
    icon: Hourglass,
    price: 400000,
    freePrice: 400000,
    unit: "بعد ساعت دوم",
  },
  {
    id: "ambulance-floor",
    title: "طبقات بدون آسانسور",
    description: "",
    tariffNote: "هزینه جا به جایی با برانکارد / ویلچر",
    icon: DoorStairwell,
    price: 135000,
    freePrice: 250000,
    unit: "هر طبقه",
  },
];
/* ------------------------------- About ------------------------------ */

export const ABOUT_IMAGES = {
  main: "/images/home/ambulance-in.jpg",
  secondary: "/images/home/ambulance-in2.jpg",
};

export const VALUES: Highlight[] = [
  {
    icon: ShieldCheck,
    title: "ایمنی بیمار",
    description: "هر انتقال با ارزیابی شرایط بیمار و رعایت اصول ایمنی آغاز می‌شود.",
  },
  {
    icon: Stethoscope,
    title: "مراقبت حرفه‌ای",
    description: "همراهی دقیق و محترمانه با بیمار و همراهان در طول مسیر.",
  },
  {
    icon: BadgeCheck,
    title: "اعتمادپذیری",
    description: "شفافیت در اطلاع‌رسانی و پایبندی به تعهدات خدمات.",
  },
  {
    icon: Timer,
    title: "پاسخ‌گویی به‌موقع",
    description: "هماهنگی سریع اعزام و اطلاع‌رسانی دقیق به مراجعین.",
  },
];

export interface Credential {
  id: string;
  label: string;
  /** Leave `null` until verified information is available. */
  value: string | null;
  hint: string;
}

export const CREDENTIALS: Credential[] = [
  { id: "experience", label: "سال‌های فعالیت", value: null, hint: "سابقهٔ تأییدشده" },
  { id: "coverage", label: "محدودهٔ پوشش خدمات", value: null, hint: "شهرها و مسیرها" },
  { id: "licenses", label: "مجوزها و گواهی‌ها", value: null, hint: "مجوزهای رسمی" },
];

/* ------------------------------ Gallery ----------------------------- */

export type GalleryCategory = "fleet" | "team" | "interior";

export const GALLERY_CATEGORIES: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "همه تصاویر" },
  { id: "fleet", label: "ناوگان" },
  { id: "team", label: "کادر امدادی" },
  { id: "interior", label: "تجهیزات و داخل آمبولانس" },
];

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  caption: string;
  /** Thumbnail used in the grid (4:3). */
  thumb: string;
  /** Large version used in the lightbox. */
  full: string;
}

const galleryItem = (fileName: string, caption: string): GalleryImage => ({
  id: fileName.replace(/\.[^.]+$/, ""),
  category: "fleet",
  caption,
  thumb: `/images/gallery/${fileName}`,
  full: `/images/gallery/${fileName}`,
});

export const GALLERY_IMAGES: GalleryImage[] = [
  galleryItem("gallery-1.jpeg", "دو دستگاه آمبولانس از ناوگان مرکز"),
  galleryItem("gallery-2.jpeg", "آمبولانس آماده اعزام"),
  galleryItem("gallery-3.jpeg", "آمبولانس مرکز در شهر تهران"),
  galleryItem("gallery-4.jpeg", "نمایی از ناوگان آمبولانس مرکز"),
];

/* ------------------------------- Videos ----------------------------- */

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  /** Duration label, e.g. "۰:۱۰". */
  duration?: string;
  /** Direct MP4 URL. Leave undefined while the real video is not available. */
  videoUrl?: string;
  /** Embeddable player URL (Aparat, YouTube, ...). Used when no videoUrl exists. */
  embedUrl?: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: "video-fleet",
    title: "معرفی ناوگان آمبولانس",
    description: "نگاهی به ناوگان آمبولانس مرکز و خدمات آن.",
    thumbnail: "/images/gallery/gallery-1.jpeg",
    videoUrl: "/videos/video-1.mp4",
  },
];

/* -------------------------------- Awards ---------------------------- */

export interface AwardItem {
  id: string;
  /** Title of the plaque / certificate. */
  title?: string;
  /** Issuing organisation. */
  issuer?: string;
  /** Date as shown to visitors (e.g. "اسفند ۱۴۰۳"). */
  date?: string;
  /** Scanned image of the real document. Leave undefined to show a placeholder. */
  image?: string;
}

/**
 * Entries without an image show a clearly marked placeholder.
 * Example of a verified entry:
 * { id: "award-1", title: "...", issuer: "...", date: "...", image: "/awards/plaque-1.jpg" }
 */
export const AWARDS: AwardItem[] = [
  { id: "award-1", image: "/images/awards/award-1.jpg", issuer: "مرکز اورژانس استان تهران", date: "1405/02/01" },
  { id: "award-2", image: "/images/awards/award-2.jpg", issuer: "مرکز اورژانس استان تهران", date: "1403/12/13" },
  { id: "award-3", image: "/images/awards/award-3.jpg", issuer: "مرکز اورژانس استان تهران", date: "1404/04/16" },
  { id: "award-4", image: "/images/awards/award-4.jpg", issuer: "مرکز اورژانس استان تهران", date: "1404/04/11" },
  /*   { id: "award-3" },
    { id: "award-4" }, */
];
