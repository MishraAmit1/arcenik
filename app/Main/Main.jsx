"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useState, lazy, Suspense } from "react";
import { useProgress } from "@react-three/drei";
import dynamic from "next/dynamic";
import "./main.css";

// Immediate load for above-the-fold content
import { SectionHero } from "./SectionHero";
const SectionServices = lazy(() =>
  import("./SectionServices").then((mod) => ({ default: mod.SectionServices }))
);
const SectionProjects = lazy(() =>
  import("./SectionProjects").then((mod) => ({ default: mod.SectionProjects }))
);
const SectionProjectsMobile = lazy(() =>
  import("./SectionProjectsMobile").then((mod) => ({
    default: mod.SectionProjectsMobile,
  }))
);
const SectionTechstack = lazy(() =>
  import("./SectionTechstack").then((mod) => ({
    default: mod.SectionTechstack,
  }))
);
const SectionTestimonials = lazy(() =>
  import("./SectionTestimonials").then((mod) => ({
    default: mod.SectionTestimonials,
  }))
);
const SectionKPI = lazy(() =>
  import("./SectionKPI").then((mod) => ({ default: mod.SectionKPI }))
);
const SectionFlower = lazy(() =>
  import("./SectionFlower").then((mod) => ({ default: mod.SectionFlower }))
);
const SectionFooter = lazy(() =>
  import("./SectionFooter").then((mod) => ({ default: mod.SectionFooter }))
);

// Loading placeholder component
const SectionLoader = () => (
  <div className="section-loader">
    <div className="section-loader-spinner"></div>
  </div>
);

const Main = () => {
  const { progress } = useProgress();
  const [fadeOut, setFadeOut] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const lenis = useLenis();

  // Ensure client-side only rendering for Lenis
  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (progress === 100) {
      // Add a small delay for smoother transition
      const timer = setTimeout(() => {
        setFadeOut(true);
        lenis?.start();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [progress, lenis]);

  // Preload critical images
  useEffect(() => {
    const preloadImages = ["/images/loading.gif"];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  if (!isClient) {
    return null; // or a simple loading state
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <div className={`initial-loading-screen ${fadeOut ? "fade-out" : ""}`}>
        <div className="loading-image-box">
          <img
            src="/images/loading.gif"
            className="loading-image"
            alt="Loading"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Hero section loads immediately */}
      <SectionHero />

      <div className="normal-padding" />

      <div className="border-padding">
        <div className="section-border"></div>
      </div>

      <Suspense fallback={<SectionLoader />}>
        <SectionServices />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionProjects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SectionProjectsMobile />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionTechstack />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionTestimonials />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionKPI />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionFlower />
      </Suspense>

      <div className="normal-padding" />

      <Suspense fallback={<SectionLoader />}>
        <SectionFooter />
      </Suspense>
    </ReactLenis>
  );
};

export default Main;
