"use client";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { X, Zap } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy load Calendly widget
const CalendlyWidget = dynamic(() => import("./CalendlyWidget"), {
  ssr: false,
  loading: () => <div className="calendly-loading">Loading calendar...</div>,
});

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export const SectionServices = () => {
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const buttonRef = useRef();
  const overlayRef = useRef();
  const overlayWidgetRef = useRef();
  const overlayWidgetButtonRef = useRef();
  const videoRef = useRef();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP Animations with cleanup
  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const tl = gsap.timeline();

      // Subheadline box animation
      tl.to(subheadlineBoxRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: subheadlineBoxRef.current,
          start: "top 95%",
          once: true, // Only animate once
        },
      });

      // Headline text animation
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(
          titleSplit.words,
          {
            "will-change": "opacity, transform",
            filter: "blur(8px)",
            opacity: 0,
            yPercent: 100,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            yPercent: 0,
            stagger: 0.085,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // Description text animation
      if (descriptionRef.current) {
        const descriptionSplit = new SplitText(descriptionRef.current, {
          type: "words",
        });
        gsap.fromTo(
          descriptionSplit.words,
          { filter: "blur(8px)", opacity: 0, skewX: 0 },
          {
            opacity: 1,
            filter: "blur(0px)",
            skewX: 0,
            stagger: 0.025,
            ease: "sine.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // Button animation
      tl.to(buttonRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 95%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  // Optimized overlay toggle
  const toggleOverlay = useCallback(() => {
    if (!isOverlayVisible) {
      // Show overlay
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
      });
      gsap.fromTo(
        overlayWidgetRef.current,
        { yPercent: 10, rotate: 5, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.5, ease: customEase }
      );
      gsap.fromTo(
        overlayWidgetButtonRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: customEase }
      );
    } else {
      // Hide overlay
      gsap.to(overlayWidgetRef.current, {
        yPercent: 10,
        rotate: 5,
        opacity: 0,
        duration: 0.5,
        ease: customEase,
      });
      gsap.to(overlayWidgetButtonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: customEase,
      });
      gsap.to(overlayRef.current, {
        delay: 0.1,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });
    }
    setIsOverlayVisible(!isOverlayVisible);
  }, [isOverlayVisible]);

  // Video load handler
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Memoize video props
  const videoProps = useMemo(
    () => ({
      src: "/videos/serviceshighquality.mp4",
      className: "services-content-video",
      autoPlay: true,
      muted: true,
      playsInline: true,
      preload: "metadata", // Changed from "auto" for better performance
      loop: true,
      onLoadedData: handleVideoLoad,
    }),
    [handleVideoLoad]
  );

  if (!isClient) {
    return (
      <section className="services">
        <div className="services-content">
          <div className="textbox">
            <div className="subheadline-box">
              <Zap className="subheadline-box-icon" />
              <h2 className="small-description grey">Our Services</h2>
            </div>
            <div className="titlebox">
              <div className="titlebox-gradient" />
              <h1 className="subheadline white">Your Digital Powerhouse</h1>
            </div>
            <p className="description grey">
              Where innovation fuels transformation. We empower brands to
              redefine possibilities and thrive in the ever-evolving digital
              landscape.
            </p>
          </div>
          <div className="services-content-container">
            <div className="video-placeholder">Loading video...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="services">
      {/* Calendly Overlay */}
      <div
        className="calendly-overlay"
        ref={overlayRef}
        style={{ display: "none", opacity: 0 }}
        onClick={toggleOverlay}
      >
        <div className="calendly-overlay-widget" ref={overlayWidgetRef}>
          <div className="calendly-overlay-widget-border" />
          <div className="calendly-overlay-widget-scrollbar-hider" />
          <Suspense
            fallback={
              <div className="calendly-loading">Loading calendar...</div>
            }
          >
            <CalendlyWidget />
          </Suspense>
        </div>
        <div
          className="calendly-overlay-widget-button"
          ref={overlayWidgetButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            toggleOverlay();
          }}
        >
          <X className="calendly-overlay-widget-button-icon" />
        </div>
      </div>

      <div className="services-content">
        <div className="textbox">
          <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
            <Zap className="subheadline-box-icon" />
            <h2 className="small-description grey">Our Services</h2>
          </div>
          <div className="titlebox">
            <div className="titlebox-gradient" />
            <h1 className="subheadline white" ref={titleRef}>
              Your Digital Powerhouse
            </h1>
          </div>
          <p className="description grey" ref={descriptionRef}>
            Where innovation fuels transformation. We empower brands to redefine
            possibilities and thrive <br /> in the ever-evolving digital
            landscape.
          </p>
          <div
            className="contact-button-wrapper opacity-blur"
            ref={buttonRef}
            onClick={toggleOverlay}
          >
            <button className="contact-button-white">
              <span>
                <span className="contact-button-container-white">
                  <span className="contact-button-primary-white"></span>
                  <span className="contact-button-complimentary-white"></span>
                </span>
              </span>
              <span className="description black">Book a call</span>
            </button>
          </div>
        </div>

        <div className="services-content-container">
          <div className="services-content-container-left" />
          <div className="services-content-container-right" />
          <div className="services-content-container-bottom" />
          <div className="services-content-container-top" />

          {!videoLoaded && (
            <div className="video-placeholder">
              <div className="video-loader"></div>
              <p>Loading video...</p>
            </div>
          )}

          <video
            ref={videoRef}
            {...videoProps}
            style={{ opacity: videoLoaded ? 1 : 0 }}
          />
        </div>
      </div>
    </section>
  );
};
