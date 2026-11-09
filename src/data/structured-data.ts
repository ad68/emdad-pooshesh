import { CONTACT, SITE_URL } from "@/data/site";

const tehranArea = {
  "@type": "City",
  name: "تهران",
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "استان تهران",
  },
};

const dispatchHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "https://schema.org/Monday",
    "https://schema.org/Tuesday",
    "https://schema.org/Wednesday",
    "https://schema.org/Thursday",
    "https://schema.org/Friday",
    "https://schema.org/Saturday",
    "https://schema.org/Sunday",
  ],
  opens: "00:00",
  closes: "23:59",
};

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "مرکز آمبولانس خصوصی امداد پوشش",
      alternateName: "Emdaad Pooshesh",
      url: SITE_URL,
      logo: { "@id": `${SITE_URL}/#logo` },
      description:
        "مرکز آمبولانس خصوصی امداد پوشش، ارائه‌دهنده خدمات شبانه‌روزی اعزام آمبولانس و انتقال بیمار در تمام مناطق تهران.",
      telephone: CONTACT.phones.map((phone) => phone.tel),
      email: CONTACT.email.value,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.value.replace(/^تهران، /, ""),
        addressLocality: "تهران",
        addressRegion: "استان تهران",
        addressCountry: "IR",
      },
      areaServed: tehranArea,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Saturday",
          "https://schema.org/Sunday",
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
        ],
        opens: "08:00",
        closes: "16:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT.emergency.tel,
        contactType: "ambulance dispatch",
        availableLanguage: "Persian",
        hoursAvailable: dispatchHours,
      },
    },
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo.svg`,
      contentUrl: `${SITE_URL}/logo.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "مرکز آمبولانس خصوصی امداد پوشش | Emdaad Pooshesh",
      url: SITE_URL,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#ambulance-service`,
      name: "آمبولانس خصوصی در تهران",
      serviceType: "خدمات آمبولانس خصوصی و انتقال بیمار",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: tehranArea,
      hoursAvailable: dispatchHours,
    },
  ],
};
