"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { SectionFooter } from "../Main/SectionFooter";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

export const AboutPageSection = () => {
  const titleRef = useRef();
  const titleRef2 = useRef();
  const descriptionRef = useRef();
  const lineRef = useRef();
  const itemRefs = useRef([]);
  const stickyRefs = useRef([]);

  const teamMembers = [
    { name: "Shubham Chaudhary", title: "Co-CEO & Co-Founder" },
    { name: "Aditya Mishra", title: "Co-CEO & Co-Founder" },
    { name: "Amit Mishra", title: "COO & Co-Founder" },
    { name: "Krish Patel", title: "Motion Graphics Designer" },
    { name: "Abhimanyu Chaudhary", title: "Visualization Expert" },
  ];

  const services = [
    {
      number: "01",
      title: "Website Development",
      description:
        "At Arcenik, we build modern, responsive, and SEO-friendly websites that not only look amazing but also perform flawlessly. From simple portfolios to enterprise web apps, our team delivers high-quality digital experiences tailored to your business.",
      image: "/images/mockup4.webp",
    },
    {
      number: "02",
      title: "UI/UX Design",
      description:
        "We believe design is more than visuals—it's about creating experiences. Arcenik crafts clean, intuitive, and engaging UI/UX designs that guide users smoothly and keep them connected to your brand.",
      image: "/images/mockup12.webp",
    },
    {
      number: "03",
      title: "E-Commerce Solutions",
      description:
        "Sell smarter with Arcenik's custom e-commerce solutions. From product catalogs to secure payments, we develop online stores that are scalable, user-friendly, and optimized to drive more conversions.",
      image: "/images/mockup7.webp",
    },
    {
      number: "04",
      title: "Branding & SEO",
      description:
        "A great website needs visibility. Arcenik boosts your digital presence with powerful branding and SEO strategies, helping your business rank higher, attract the right audience, and grow consistently online.",
      image: "/images/mockup11.webp",
    },
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Title animation
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
        delay: 0.2,
        opacity: 1,
        filter: "blur(0px)",
        yPercent: 0,
        stagger: 0.02,
        duration: 0.75,
        ease: "power1",
      }
    );

    // Description animation
    gsap.to(descriptionRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      delay: 0.6,
    });

    // Line animation
    gsap.fromTo(
      lineRef.current,
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.5, delay: 0.5 }
    );

    // Title 2 animation
    const titleSplit2 = new SplitText(titleRef2.current, { type: "words" });
    gsap.fromTo(
      titleSplit2.words,
      { "will-change": "opacity", filter: "blur(8px)", opacity: 0 },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.025,
        ease: "sine",
        scrollTrigger: {
          trigger: titleRef2.current,
          start: "top 95%",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Team member animations
    itemRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { yPercent: 100, opacity: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.75,
            delay: index * 0.1,
            ease: "power3",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
            },
          }
        );
      }
    });

    // Sticky cards animation - only on desktop
    mm.add("(min-width: 768px)", () => {
      stickyRefs.current.forEach((ref, position) => {
        if (!ref) return;

        const el = ref;
        const isLast = position === stickyRefs.current.length - 1;

        gsap.set(el, { willChange: "transform, filter" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "center center",
            end: "350%",
            scrub: 1,
          },
        });

        timeline
          .to(
            el,
            {
              ease: "none",
              startAt: { filter: "blur(0px)" },
              filter: isLast ? "blur(0px)" : "blur(3px)",
              scrollTrigger: {
                trigger: el,
                start: "center center",
                end: "+=100%",
                scrub: 1,
              },
            },
            0
          )
          .to(
            el,
            {
              ease: "none",
              scale: isLast ? 1 : 0.55,
              yPercent: isLast ? 0 : -45,
            },
            0
          );
      });
    });

    return () => {
      mm.revert();
      titleSplit.revert();
      titleSplit2.revert();
    };
  }, []);

  return (
    <ReactLenis root>
      <section className="about">
        <div className="about-content">
          <div className="about-content-top">
            <div className="about-content-textbox">
              <div className="titlebox">
                <div className="titlebox-gradient" />
                <h1 className="headline white" ref={titleRef}>
                  A Global Network Of Talent
                </h1>
              </div>
              <p className="description grey opacity-blur" ref={descriptionRef}>
                We&apos;ve assembled a team of dedicated professionals from
                diverse backgrounds who share the same passion for your brand as
                you do.
              </p>
            </div>
            <div className="about-divider" ref={lineRef} />
          </div>

          <div className="about-team">
            <div className="about-team-container">
              {teamMembers.map((member, index) => (
                <div
                  className="about-team-item"
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                >
                  <p className="description white">{member.name}</p>
                  <p className="description white about-team-title">
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-divider" />

          <div className="about-whyus">
            <p className="description about-whyus-description grey">Why us</p>
            <p
              className="subheadline about-whyus-subheadline white"
              ref={titleRef2}
            >
              At Arcenik, we embody the startup mindset — dynamic, innovative,
              and hungry to make a difference. We don&apos;t just create amazing
              works; we partner with our clients to revolutionize their
              industries through groundbreaking digital experiences. From
              redefining brand engagement to boosting conversions, every project
              we take on is an opportunity to challenge the norm, deliver
              excellence, and leave an impact.
            </p>
          </div>

          <div className="about-divider" />

          <div className="about-sticky-container">
            {services.map((service, index) => (
              <div
                className="about-sticky-item"
                key={index}
                ref={(el) => (stickyRefs.current[index] = el)}
              >
                <div className="about-sticky-item-left">
                  <div className="about-sticky-item-left-textbox">
                    <h1 className="headline white about-sticky-headline">
                      {service.title.split(" ").map((word, i) => (
                        <React.Fragment key={i}>
                          {word}
                          {i === 0 && <br />}
                          {i > 0 && " "}
                        </React.Fragment>
                      ))}
                    </h1>
                    <p className="description about-sticky-item-left-textbox-description grey">
                      {service.description.split("Arcenik").map((part, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <b>Arcenik</b>}
                          {part}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <h1 className="headline white about-sticky-number">
                    ({service.number})
                  </h1>
                </div>
                <div className="about-sticky-item-right">
                  <div className="about-sticky-item-right-imagebox">
                    <img
                      src={service.image}
                      className="about-sticky-item-right-image"
                      alt={service.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionFooter />
    </ReactLenis>
  );
};
