"use client";
import { ArrowUpRight } from "lucide-react";
import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import "./Navigation.css";

export const Navigation = () => {
  const navigationBar = useRef(null);
  const navigationBarCenter = useRef(null);
  const navigationBarCenterRef1 = useRef(null);
  const navigationBarCenterRef2 = useRef(null);
  const navigationBarCenterRef3 = useRef(null);

  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerLine1 = useRef(null);
  const hamburgerLine2 = useRef(null);
  const hamburgerLine3 = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();

  // Optimized initial animation with timeline
  useLayoutEffect(() => {
    if (isInitialized) return;

    const tl = gsap.timeline({
      onComplete: () => setIsInitialized(true),
    });

    tl.to(navigationBar.current, {
      opacity: 1,
      rotateY: "0deg",
      scale: "1",
      rotateX: "0deg",
      translateY: "0vh",
      duration: 0.75,
      ease: "power1",
      delay: 0.75,
    })
      .fromTo(
        navigationBar.current,
        { width: "25%" },
        { width: "100%", duration: 0.75, ease: "power1" }
      )
      .set(navigationBarCenter.current, { display: "flex" })
      .to(
        [
          navigationBarCenterRef1.current,
          navigationBarCenterRef2.current,
          navigationBarCenterRef3.current,
        ],
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

    return () => tl.kill();
  }, [isInitialized]);

  // Hamburger to X animation with proper mobile viewport units
  const animateHamburger = useCallback((toX) => {
    // Check if we're on mobile for proper units
    const isMobile = window.innerWidth <= 768;
    const yOffset = isMobile ? "0.8vw" : "6px";

    if (toX) {
      // Transform to X
      gsap.to(hamburgerLine1.current, {
        rotation: 45,
        y: yOffset,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerLine2.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(hamburgerLine3.current, {
        rotation: -45,
        y: `-${yOffset}`,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Transform back to hamburger
      gsap.to(hamburgerLine1.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerLine2.current, {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.to(hamburgerLine3.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  // Mobile menu animation with proper class management
  useEffect(() => {
    if (isMenuOpen) {
      // Opening menu
      mobileMenuRef.current.classList.add("open");
      overlayRef.current.classList.add("open");

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      animateHamburger(true);
    } else {
      // Closing menu
      mobileMenuRef.current.classList.remove("open");
      overlayRef.current.classList.remove("open");

      // Re-enable body scroll
      document.body.style.overflow = "auto";

      animateHamburger(false);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, animateHamburger]);

  const handleNavigate = useCallback(
    (path) => {
      setIsMenuOpen(false);
      router.push(path);
    },
    [router]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close menu when clicking overlay
  const handleOverlayClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="navigation-wrapper">
      <div className="navigation-inside" ref={navigationBar}>
        {/* LEFT */}
        <div className="navigation-inside-left">
          <img
            src="/images/logo1.png"
            className="navigation-inside-left-image"
            alt="Arcenik Logo"
            loading="eager"
            width="190"
            height="190"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="navigation-inside-big" ref={navigationBarCenter}>
          <p
            className="small-description white hover-text-white nav-link"
            ref={navigationBarCenterRef1}
            onClick={() => handleNavigate("/")}
          >
            Home
          </p>
          <p
            className="small-description white hover-text-white nav-link"
            ref={navigationBarCenterRef2}
            onClick={() => handleNavigate("/about")}
          >
            About
          </p>
          <p
            className="small-description white hover-text-white nav-link"
            ref={navigationBarCenterRef3}
            onClick={() => handleNavigate("/works")}
          >
            Works
          </p>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="navigation-inside-right">
          <button
            className="button button-navigation"
            onClick={() => handleNavigate("/contact")}
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

        {/* MOBILE HAMBURGER */}
        <div className="navigation-inside-right-mobile">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="hamburger-line" ref={hamburgerLine1} />
            <div className="hamburger-line" ref={hamburgerLine2} />
            <div className="hamburger-line" ref={hamburgerLine3} />
          </div>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      <div
        ref={overlayRef}
        className="mobile-overlay"
        onClick={handleOverlayClick}
      />

      {/* MOBILE MENU */}
      <div ref={mobileMenuRef} className="mobile-menu">
        <div className="mobile-menu-item" onClick={() => handleNavigate("/")}>
          Home
        </div>
        <div
          className="mobile-menu-item"
          onClick={() => handleNavigate("/about")}
        >
          About
        </div>
        <div
          className="mobile-menu-item"
          onClick={() => handleNavigate("/works")}
        >
          Works
        </div>
        <div
          className="mobile-menu-item"
          onClick={() => handleNavigate("/contact")}
        >
          Get In Touch
        </div>
      </div>
    </div>
  );
};
