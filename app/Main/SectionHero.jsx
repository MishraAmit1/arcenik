"use client";
import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import { ArrowUpRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load the 3D model
const Item3 = dynamic(
  () => import("./HeroModel/Coins").then((mod) => ({ default: mod.Item3 })),
  {
    ssr: false,
  }
);

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionHero = () => {
  // REFS
  const titleRef = useRef();
  const descriptionRef = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const logosWrapperRef = useRef();
  const cursor = useRef();
  const [showCursor, setShowCursor] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  // Memoize logo array
  const logoSources = useMemo(
    () => ["/logos/adobe.webp", "/logos/webflow.svg", "/logos/stripe.svg"],
    []
  );

  // Event handlers
  const handleMouseEnter = () => setShowCursor(true);
  const handleMouseLeave = () => setShowCursor(false);

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP ANIMATIONS
  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 1 });

      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      gsap.fromTo(
        titleSplit.chars,
        {
          "will-change": "opacity, transform",
          filter: "blur(8px)",
          opacity: 0,
          yPercent: 50,
        },
        {
          delay: 0.4,
          opacity: 1,
          filter: "blur(0px)",
          yPercent: 0,
          stagger: 0.02,
          duration: 0.75,
          ease: "power1.out",
        }
      );

      const tl = gsap.timeline();
      tl.to(descriptionRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        delay: 0.9,
      })
        .to(
          buttonRef1.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.5"
        )
        .to(
          buttonRef2.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.2"
        )
        .to(
          logosWrapperRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          "-=0.8"
        );
    });

    return () => ctx.revert();
  }, [isClient]);

  // Cursor animation
  useEffect(() => {
    if (!isClient) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId;
    const speed = 0.05;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;

      cursorX += distX * speed;
      cursorY += distY * speed;

      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  // Cursor visibility
  useEffect(() => {
    if (!isClient || !cursor.current) return;

    gsap.to(cursor.current, {
      autoAlpha: showCursor ? 1 : 0,
      scale: showCursor ? 1 : 0,
      duration: 0.3,
      ease: showCursor ? "power3.out" : "power3.in",
    });
  }, [showCursor, isClient]);

  // SSR fallback
  if (!isClient) {
    return (
      <section className="shimmer-section">
        <div className="shimmer-content-right">
          <div className="shimmer-loader">
            <div className="shimmer-text">Preparing Experience...</div>
            <div className="shimmer-button"></div>
            <div className="shimmer-button"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-background-element-small" />
      <div className="hero-background-element-grid-small" />
      <div className="hero-content">
        <div className="hero-content-row">
          <div className="hero-content-left">
            <div className="hero-textbox">
              <div className="hero-titlebox">
                <div className="hero-titlebox-gradient" />
                <h1 className="headline hero-headline white" ref={titleRef}>
                  Crafting Digital <br /> Masterpieces
                </h1>
              </div>
              <p
                className="big-description grey opacity-blur"
                ref={descriptionRef}
              >
                Harnessing Cutting-Edge Visualization Technology to Transform
                Vision into Tailored Digital Reality
              </p>
            </div>
            <div className="hero-buttons-row">
              <button
                className="button button-transparent-border opacity-blur"
                ref={buttonRef1}
              >
                <div className="button-content">
                  <span className="small-description">See More</span>
                  <span className="small-description">See More</span>
                </div>
                <div className="button-circle">
                  <ArrowUpRight className="button-icon button-icon-180" />
                </div>
              </button>
              <button
                className="button button-transparent-border opacity-blur"
                ref={buttonRef2}
              >
                <div className="button-content">
                  <span className="small-description">Get In Touch</span>
                  <span className="small-description">Get In Touch</span>
                </div>
                <div className="button-circle">
                  <ArrowUpRight className="button-icon" />
                </div>
              </button>
            </div>
          </div>
          <div
            className="hero-content-right"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
          >
            {/* Loading state OUTSIDE Canvas */}
            {!is3DLoaded && (
              <div className="three-loader">
                <div className="cube-loader">
                  <div className="cube-face face-front"></div>
                  <div className="cube-face face-back"></div>
                  <div className="cube-face face-right"></div>
                  <div className="cube-face face-left"></div>
                  <div className="cube-face face-top"></div>
                  <div className="cube-face face-bottom"></div>
                </div>
                <p className="loading-text">Loading 3D Scene...</p>
              </div>
            )}

            {/* Canvas with ONLY Three.js objects */}
            <Canvas
              style={{
                pointerEvents: "auto",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: is3DLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
              camera={{ position: [2, 0, 10], fov: 35 }}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
              }}
              onCreated={() => {
                // Canvas is ready
                setTimeout(() => setIs3DLoaded(true), 500);
              }}
            >
              <Suspense fallback={null}>
                <Float rotationIntensity={0.5} floatIntensity={2} speed={2}>
                  <Item3 />
                </Float>
                <Environment preset="sunset" />
                <OrbitControls
                  maxPolarAngle={Math.PI / 2}
                  enableZoom={false}
                  enableRotate={true}
                  enablePan={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="hero-content-bottom opacity-blur" ref={logosWrapperRef}>
          <Marquee
            className="hero-content-bottom-row"
            gradient={true}
            gradientColor="#010101"
            gradientWidth={250}
            speed={50}
            pauseOnHover={true}
          >
            {Array.from({ length: 6 }).map((_, groupIndex) =>
              logoSources.map((src, i) => (
                <div
                  className="hero-content-bottom-item"
                  key={`${groupIndex}-${i}`}
                >
                  <Image
                    width={100}
                    height={100}
                    src={src}
                    alt={`Partner logo ${i + 1}`}
                    className="hero-content-bottom-image"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              ))
            )}
          </Marquee>
        </div>
      </div>
      <div className="hover-cursor" ref={cursor}>
        <p className="small-description white">Drag</p>
      </div>
    </section>
  );
};
