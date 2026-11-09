import type { Metadata } from "next";
import localFont from "next/font/local";
import { BRAND, SITE_URL } from "@/data/site";
import { STRUCTURED_DATA } from "@/data/structured-data";
import "leaflet/dist/leaflet.css";
import "../index.css";

const iranSans = localFont({
  src: [
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Thin.woff2", weight: "100", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-UltraLight.woff2", weight: "200", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Light.woff2", weight: "300", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Regular.woff2", weight: "400", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Medium.woff2", weight: "500", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-DemiBold.woff2", weight: "600", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Bold.woff2", weight: "700" },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-ExtraBold.woff2", weight: "800", style: 'normal', },
    { path: "../assets/fonts/iransans/woff2/IRANSansXFaNum-Black.woff2", weight: "900", style: 'normal', },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "امداد پوشش | آمبولانس خصوصی شبانه‌روزی در تهران",
  description:
    "مرکز آمبولانس خصوصی امداد پوشش، ارائه‌دهنده خدمات شبانه‌روزی اعزام آمبولانس و انتقال بیمار در تمام مناطق تهران. برای دریافت خدمات و هماهنگی انتقال بیمار با ما تماس بگیرید.",
  applicationName: BRAND.fullName,
  authors: [{ name: BRAND.fullName }],
  creator: BRAND.fullName,
  publisher: BRAND.fullName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: BRAND.fullName,
    title: "امداد پوشش | آمبولانس خصوصی شبانه‌روزی در تهران",
    description:
      "اعزام شبانه‌روزی آمبولانس و انتقال بیمار در تمام مناطق تهران. برای هماهنگی با مرکز آمبولانس خصوصی امداد پوشش تماس بگیرید.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "آمبولانس مرکز امداد پوشش در تهران",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امداد پوشش | آمبولانس خصوصی شبانه‌روزی در تهران",
    description:
      "اعزام شبانه‌روزی آمبولانس و انتقال بیمار در تمام مناطق تهران.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${iranSans.variable}`} lang="fa-IR" dir="rtl">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
