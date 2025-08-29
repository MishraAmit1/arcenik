"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Hand, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "./Carousel/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./Carousel/EmblaCarouselDotButton";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionProjects = () => {
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();
  const imageContainerRef = useRef();
  const cursor = useRef();
  const [showCursor, setShowCursor] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Memoize project data
  const projectData = useMemo(
    () => [
      {
        src: "/mockups/heave.webp",
        alt: "Heavecorp project",
        title: "Heavecorp",
      },
      {
        src: "/mockups/essentia.webp",
        alt: "Essentia project",
        title: "Essentia",
      },
      {
        src: "/mockups/kinimatic.webp",
        alt: "Kinimatic project",
        title: "Kinimatic",
      },
      { src: "/mockups/peak.webp", alt: "Peak project", title: "Peak" },
      {
        src: "/mockups/vitalenta.webp",
        alt: "Vitalenta project",
        title: "Vitalenta",
      },
      { src: "/mockups/rev.webp", alt: "Rev project", title: "Rev" },
    ],
    []
  );

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // EMBLA CAROUSEL - Only initialize on client
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // GSAP ANIMATIONS with cleanup
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
          once: true,
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
            yPercent: 50,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            yPercent: 0,
            stagger: 0.05,
            duration: 0.75,
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
          { filter: "blur(8px)", opacity: 0 },
          {
            opacity: 1,
            filter: "blur(0px)",
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

      // Image parallax effect
      gsap.fromTo(
        imageContainerRef.current,
        { yPercent: 7.5 },
        {
          yPercent: -7.5,
          scrollTrigger: {
            trigger: ".projects",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isClient]);

  // Optimized cursor following
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

  // Event handlers
  const handleMouseEnter = useCallback(() => setShowCursor(true), []);
  const handleMouseLeave = useCallback(() => setShowCursor(false), []);

  // Image load handler
  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // SSR fallback
  if (!isClient) {
    return (
      <section className="projects projects-desktop">
        <div className="textbox">
          <div className="subheadline-box">
            <Star className="subheadline-box-icon" />
            <h2 className="small-description grey">Featured Works</h2>
          </div>
          <div className="titlebox">
            <div className="titlebox-big-gradient" />
            <h1 className="subheadline white">
              Pioneering Projects That Consistently{" "}
              <br className="hide-on-mobile" /> Redefine What's Possible
            </h1>
          </div>
          <p className="description grey">
            Transforming startups, SMEs, and industry{" "}
            <br className="hide-on-desktop" /> giants into digital leaders.
          </p>
        </div>
        <div className="projects-content">
          <div className="projects-loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects projects-desktop">
      <div className="textbox">
        <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
          <Star className="subheadline-box-icon" />
          <h2 className="small-description grey">Featured Works</h2>
        </div>
        <div className="titlebox">
          <div className="titlebox-big-gradient" />
          <h1 className="subheadline white" ref={titleRef}>
            Pioneering Projects That Consistently{" "}
            <br className="hide-on-mobile" /> Redefine What's Possible
          </h1>
        </div>
        <p className="description grey" ref={descriptionRef}>
          Transforming startups, SMEs, and industry{" "}
          <br className="hide-on-desktop" /> giants into digital leaders.
        </p>
      </div>

      <div
        className="projects-content"
        ref={contentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onNextButtonClick}
        style={{ position: "relative" }}
      >
        <div className="projects-gradient-top" />
        <div className="projects-gradient-bottom" />

        <div className="project-content-wrapper" ref={imageContainerRef}>
          <div className="projects-carousel" ref={emblaRef}>
            <div className="projects-carousel-row">
              {projectData.map((project, index) => (
                <div className="projects-carousel-item" key={index}>
                  <Image
                    src={project.src}
                    width={1920}
                    height={1080}
                    className="projects-carousel-item-image"
                    alt={project.alt}
                    loading={index === 0 ? "eager" : "lazy"} // First image loads immediately
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    onLoad={handleImageLoad}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot${
                index === selectedIndex ? " embla__dot--selected" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hover-cursor" ref={cursor}>
        <p className="small-description white">See More</p>
      </div>
    </section>
  );
};
