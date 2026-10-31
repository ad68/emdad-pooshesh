"use client";


import { SECTION_IDS } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";

import { FloatingEmergencyButton } from "./components/FloatingEmergencyButton";
import { Footer } from "@/components/website/layout/Footer";
import { Header } from "@/components/website/layout/Header";
import { Hero } from "./components/Hero";
import { PhotoGallery } from "./components/PhotoGallery";
import { Services } from "./components/Services";
import { TopBar } from "./components/TopBar";
import { TrustStrip } from "./components/TrustStrip";
import { VideoGallery } from "./components/VideoGallery";

export default function Landing() {
  const activeSectionId = useScrollSpy(SECTION_IDS);


  /** "Request this service" buttons pre-fill the contact form and scroll to it. */


  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[200] focus:rounded-full focus:bg-accent-500 focus:px-5 focus:py-3 focus:font-bold focus:text-brand-950"
      >
        پرش به محتوای اصلی
      </a>

      <TopBar />
      <Header activeId={activeSectionId} />

      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <PhotoGallery />
        <VideoGallery />
        <Awards />
        <Contact />
      </main>

      <Footer />
      <FloatingEmergencyButton />
    </div>
  );
}
