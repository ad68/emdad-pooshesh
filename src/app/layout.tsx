import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "مرکز آمبولانس خصوصی امداد پوشش | انتقال ایمن بیمار",
  description:
    "مرکز آمبولانس خصوصی امداد پوشش؛ انتقال ایمن بیمار، آمبولانس خصوصی، انتقال بین مراکز درمانی، بین‌شهری و اعزام به مراسم و رویدادها.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${iranSans.variable}`} lang="fa" dir="rtl">
      <body >{children}</body>
    </html>
  );
}
