"use client";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronRight,
  Hand,
  Layers,
  Link,
  Send,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./Carousel/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./Carousel/EmblaCarouselDotButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TWEEN_FACTOR_BASE = 0.25;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

export const SectionTechstack = () => {
  // REFS
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const bentoBoxRef1 = useRef();
  const bentoBoxRef2 = useRef();
  const bentoBoxRef3 = useRef();
  const videoRef = useRef(null);

  // STATE
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  // Memoize slide data
  const slideData = useMemo(
    () => [
      {
        logo: "/logos/blenderwhite.svg",
        alt: "Blender",
        description:
          "We create stunning 3D models, animations, and realistic environments for immersive experiences.",
      },
      {
        logo: "/logos/ae.svg",
        alt: "After Effects",
        description:
          "Dynamic motion graphics and cinematic visual effects brought to life with seamless precision.",
      },
      {
        logo: "/logos/photoshop.svg",
        alt: "Photoshop",
        description:
          "Precision-crafted designs and visuals with unmatched detail for polished, professional results.",
      },
      {
        logo: "/logos/davinciresolvewhite.svg",
        alt: "DaVinci Resolve",
        description:
          "Professional-grade video editing and vibrant color grading for high-quality storytelling impact.",
      },
      {
        logo: "/logos/photoshop.svg",
        alt: "Photoshop",
        description:
          "Complex simulations and breathtaking VFX for cutting-edge creativity in every project.",
      },
    ],
    []
  );

  // Memoize card data
  const cardData = useMemo(
    () => [
      {
        platform: "Slack",
        logo: "/logos/slack.png",
        message:
          "Content draft progress at 75%. Feedback incorporated, updates shared.",
        date: "Nov 5",
      },
      {
        platform: "Gmail",
        logo: "/logos/gmail.png",
        message:
          "Development is now 90% complete. Testing schedule shared with all stakeholders.",
        date: "Nov 6",
      },
      {
        platform: "Notion",
        logo: "/logos/notion.png",
        message:
          "Design phase completed successfully. Tasks updated and prepared for review.",
        date: "Nov 7",
      },
    ],
    []
  );

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

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

      // Bento grid boxes animations
      gsap.fromTo(
        bentoBoxRef1.current,
        { rotationY: 30, scale: 0.6, opacity: 0 },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bentoBoxRef1.current,
            start: "top bottom",
            once: true,
          },
        }
      );

      gsap.fromTo(
        bentoBoxRef2.current,
        { rotationY: 30, scale: 0.6, opacity: 0 },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bentoBoxRef2.current,
            start: "top bottom",
            once: true,
          },
        }
      );

      gsap.fromTo(
        bentoBoxRef3.current,
        { rotationY: 30, scale: 0.6, opacity: 0 },
        {
          delay: 0.2,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bentoBoxRef3.current,
            start: "top bottom",
            once: true,
          },
          onComplete: () => setCardsAnimated(true),
        }
      );
    });

    return () => ctx.revert();
  }, [isClient]);

  // Optimized card animation
  useEffect(() => {
    if (!cardsAnimated || !isClient) return;

    const cards = document.querySelectorAll(".techstack-item-card");
    cards.forEach((card, index) => {
      card.classList.add(`techstack-item-card-animated-${index + 1}`);
    });

    const timer = setTimeout(() => {
      cards.forEach((card) => {
        card.classList.add("techstack-item-card-animated-hover");
      });
    }, 1250);

    return () => clearTimeout(timer);
  }, [cardsAnimated, isClient]);

  // VIDEO handlers
  const handleVideoButtonClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // EMBLA CAROUSEL
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
    skipSnaps: false,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode) =>
        slideNode.querySelector(
          ".techstack-item-content-column-slider-item-child"
        )
      );
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenEffects = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const opacity = numberWithinRange(tweenValue, 0, 1).toString();

        // Apply scale effect
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
        }

        // Apply opacity effect
        const slideNode = emblaApi.slideNodes()[slideIndex];
        if (slideNode) {
          slideNode.style.opacity = opacity;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenEffects(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenEffects)
      .on("scroll", tweenEffects)
      .on("slideFocus", tweenEffects);

    // Cleanup
    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenEffects)
        .off("scroll", tweenEffects)
        .off("slideFocus", tweenEffects);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenEffects]);

  // Auto-play carousel
  useEffect(() => {
    if (!emblaApi || !isClient) return;

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isClient]);

  // SSR fallback
  if (!isClient) {
    return (
      <section className="techstack">
        <div className="techstack-content">
          <div className="textbox">
            <div className="subheadline-box">
              <Layers className="subheadline-box-icon" />
              <h2 className="small-description grey">Our Techstack</h2>
            </div>
            <div className="titlebox">
              <div className="titlebox-big-gradient" />
              <h1 className="subheadline white">
                Integrating Powerful Tools To Create Seamless, Scalable, And
                Innovative Solutions.
              </h1>
            </div>
            <p className="description grey">
              Maximizing Results with Cutting-Edge Technology
            </p>
          </div>
          <div className="techstack-loading">Loading techstack...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="techstack">
      <div className="techstack-content">
        <div className="textbox">
          <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
            <Layers className="subheadline-box-icon" />
            <h2 className="small-description grey">Our Techstack</h2>
          </div>
          <div className="titlebox">
            <div className="titlebox-big-gradient" />
            <h1 className="subheadline white" ref={titleRef}>
              Integrating Powerful Tools To Create Seamless,{" "}
              <br className="hide-on-mobile" /> Scalable, And Innovative
              Solutions.
            </h1>
          </div>
          <p className="description grey" ref={descriptionRef}>
            Maximizing Results with Cutting-Edge Technology
          </p>
        </div>

        <div className="techstack-container">
          {/* Video Bento Box */}
          <div
            className="techstack-item-big techstack-item-no-padding"
            ref={bentoBoxRef1}
          >
            <div className="techstack-item-content">
              <div className="techstack-item-content-center">
                <div className="textbox">
                  <h2 className="small-subheadline white hide-on-mobile">
                    Maximizing Results with <br /> Cutting-Edge Technology
                  </h2>
                  <button
                    className="button hero-button button-transparent-border"
                    onClick={handleVideoButtonClick}
                  >
                    <div className="button-content">
                      <span className="small-description">
                        See Integrations
                      </span>
                      <span className="small-description">
                        See Integrations
                      </span>
                    </div>
                    <div className="button-circle button-circle-white">
                      <ArrowUpRight className="button-icon button-icon-180" />
                    </div>
                  </button>
                </div>
              </div>

              {!videoLoaded && (
                <div className="video-placeholder">
                  <div className="video-loader"></div>
                  <p>Loading video...</p>
                </div>
              )}

              <video
                className="techstack-item-content-video"
                ref={videoRef}
                src="/videos/logos.mp4"
                muted
                playsInline={true}
                loop
                preload="metadata"
                onLoadedData={handleVideoLoad}
                style={{ opacity: videoLoaded ? 1 : 0 }}
              />
            </div>
            <div className="background-gradient-circle" />
            <div className="techstack-item-no-padding-border" />
          </div>

          {/* Carousel Bento Box */}
          <div
            className="techstack-item-small techstack-item-small-mobile-big"
            ref={bentoBoxRef2}
          >
            <div className="techstack-item-content">
              <div className="techstack-item-content-column">
                <div className="techstack-item-content-column-slider">
                  <Image
                    src="/images/abs.webp"
                    width={400}
                    height={300}
                    className="techstack-item-content-column-slider-image"
                    alt="Abstract background"
                    loading="lazy"
                    quality={80}
                  />
                  <div
                    className="techstack-item-content-column-slider-carousel"
                    ref={emblaRef}
                  >
                    <div className="techstack-item-content-column-slider-carousel-row">
                      {slideData.map((slide, index) => (
                        <div
                          className="techstack-item-content-column-slider-item"
                          key={index}
                        >
                          <div className="techstack-item-content-column-slider-item-child">
                            <Image
                              src={slide.logo}
                              width={80}
                              height={80}
                              className="techstack-item-content-column-slider-item-image"
                              alt={slide.alt}
                              loading="lazy"
                              quality={90}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="techstack-item-content-column-textbox">
                  <h2 className="small-subheadline white">
                    Integration Is Key
                  </h2>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedIndex}
                      className="description grey"
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {slideData[selectedIndex]?.description}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="techstack-item-content-column-border" />

                <div className="techstack-item-content-column-bottom">
                  <div className="techstack-item-content-column-bottom-left">
                    <button
                      className="button techstack-item-content-column-bottom-button"
                      onClick={onPrevButtonClick}
                      disabled={prevBtnDisabled}
                    >
                      <div className="button-content">
                        <span className="small-description">Previous</span>
                        <span className="small-description">Previous</span>
                      </div>
                    </button>
                  </div>

                  <div className="techstack-item-content-column-bottom-center">
                    <div className="embla__dots-small">
                      {scrollSnaps.map((_, index) => (
                        <DotButton
                          key={index}
                          onClick={() => onDotButtonClick(index)}
                          className={`embla__dot-small${
                            index === selectedIndex
                              ? " embla__dot--selected-small"
                              : ""
                          }`}
                          aria-label={`Go to project ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="techstack-item-content-column-bottom-right">
                    <button
                      className="button techstack-item-content-column-bottom-button"
                      onClick={onNextButtonClick}
                      disabled={nextBtnDisabled}
                    >
                      <div className="button-content">
                        <span className="small-description">Continue</span>
                        <span className="small-description">Continue</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-gradient-circle" />
          </div>

          {/* Cards Bento Box */}
          <div className="techstack-item-small bentoBoxRef3" ref={bentoBoxRef3}>
            <div className="techstack-item-content-cards">
              <div className="techstack-item-content-textbox">
                <h2 className="small-subheadline white">
                  Seamless Client Updates
                </h2>
                <p className="description grey">
                  Personalized tools, effortless updates, communication made
                  simple.
                </p>
              </div>

              <div className="techstack-item-cards">
                {cardData.map((card, index) => (
                  <div
                    className={`techstack-item-card techstack-item-card-${
                      index + 1
                    }`}
                    key={index}
                  >
                    <div
                      className={`techstack-item-card-content techstack-item-card-content-${
                        index + 1
                      }`}
                    >
                      <div className="techstack-item-card-content-top">
                        <p className="description white">{card.platform}</p>
                        <Image
                          src={card.logo}
                          width={32}
                          height={32}
                          className="techstack-item-card-content-top-image"
                          alt={`${card.platform} logo`}
                          loading="lazy"
                          quality={90}
                        />
                      </div>
                      <div className="techstack-item-card-content-bottom">
                        <p className="small-description grey">{card.message}</p>
                      </div>
                      <p className="small-description grey">{card.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="background-gradient-circle-2" />
          </div>
        </div>
      </div>
    </section>
  );
};
