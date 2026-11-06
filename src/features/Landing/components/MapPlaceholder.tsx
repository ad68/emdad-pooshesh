"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/data/site";

const MAP_CENTER: [number, number] = [35.722623, 51.408152];

export function MapPlaceholder() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CONTACT.mapEmbedUrl || !mapElement.current) return;

    let map: import("leaflet").Map | undefined;
    let isActive = true;

    void import("leaflet").then((L) => {
      if (!isActive || !mapElement.current) return;

      map = L.map(mapElement.current, {
        center: MAP_CENTER,
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      L.tileLayer("https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}", {
        attribution: "&copy; Google Maps",
        maxZoom: 20,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.marker(MAP_CENTER, {
        title: "موقعیت مرکز",
        alt: "موقعیت مرکز",
        zIndexOffset: 1000,
        icon: L.divIcon({
          className: "azadi-map-marker",
          html: '<span aria-hidden="true"></span>',
          iconSize: [48, 48],
          iconAnchor: [24, 40],
        }),
      })
        .addTo(map)
        .bindTooltip("موقعیت مرکز", {
          permanent: true,
          direction: "top",
          offset: [0, -30],
          className: "azadi-map-tooltip",
        })
        .bindPopup("<strong>موقعیت مرکز</strong>");
    });

    return () => {
      isActive = false;
      map?.remove();
    };
  }, []);

  if (CONTACT.mapEmbedUrl) {
    return (
      <iframe
        src={CONTACT.mapEmbedUrl}
        title="نقشهٔ موقعیت مرکز"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full rounded-3xl border-0 shadow-xl shadow-brand-950/5 ring-1 ring-slate-200 sm:h-96"
      />
    );
  }

  return (
    <div
      ref={mapElement}
      role="application"
      aria-label="نقشهٔ تعاملی موقعیت مرکز"
      dir="ltr"
      className="h-80 w-full overflow-hidden rounded-3xl shadow-xl shadow-brand-950/10 ring-1 ring-slate-200 sm:h-96"
    />
  );
}
