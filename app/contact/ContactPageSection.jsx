"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  Suspense,
} from "react";
import { ReactLenis } from "lenis/react";
import "./contact.css";
import { SectionFooter } from "../Main/SectionFooter";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import CustomEase from "gsap/CustomEase";
import { usePathname, useRouter } from "next/navigation";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Video,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load Calendly widget
const CalendlyWidget = dynamic(() => import("../Main/CalendlyWidget"), {
  ssr: false,
  loading: () => <div className="calendly-loading">Loading calendar...</div>,
});

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin, CustomEase);

const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export const ContactPageSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // REFS
  const titleRef = useRef();
  const lineRef = useRef();
  const contactItem1 = useRef();
  const contactItem2 = useRef();
  const contactItem3 = useRef();
  const contactItem4 = useRef();
  const contactItem5 = useRef();
  const contactItem6 = useRef();
  const contactItem7 = useRef();
  const formRef = useRef();
  const imageRef = useRef();
  const imageWrapperRef = useRef();
  const overlayRef = useRef();
  const overlayWidgetRef = useRef();
  const overlayWidgetButtonRef = useRef();

  // Memoize contact data
  const contactData = useMemo(
    () => [
      {
        icon: Phone,
        label: "Call",
        value: "+91 XXXXX XXXXX",
        href: "tel:+91XXXXXXXXXX",
      },
      {
        icon: Mail,
        label: "Email",
        value: "contact@arcenik.com",
        href: "mailto:contact@arcenik.com",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        value: "Connect with us",
        href: "https://linkedin.com/company/arcenik",
      },
    ],
    []
  );

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ANIMATIONS
  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Headline text animation
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
          ease: "power1.out",
        }
      );

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1, delay: 0.5 }
      );

      // Contact items animation
      const contactRefs = [
        contactItem1,
        contactItem2,
        contactItem3,
        contactItem4,
        contactItem5,
        contactItem6,
        contactItem7,
        formRef,
      ];

      contactRefs.forEach((ref, index) => {
        if (ref.current) {
          gsap.to(ref.current, {
            delay: 0.4 + index * 0.1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power1.out",
          });
        }
      });

      gsap.to(imageWrapperRef.current, {
        delay: 0.5,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power1.out",
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  // CARDS MOUSE ANIMATION
  useEffect(() => {
    if (!isClient) return;

    let mouseX = 0;
    let mouseY = 0;
    let box1X = 0;
    let box1Y = 0;
    let rafId;

    const speed = 0.025;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 100 - 50;
      mouseY = (event.clientY / window.innerHeight) * 100 - 50;
    };

    const animate = () => {
      const distX1 = mouseX * -1 - box1X;
      const distY1 = mouseY * -1 - box1Y;
      box1X += distX1 * speed;
      box1Y += distY1 * speed;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${box1X}px, ${box1Y}px, 0)`;
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

  // Form handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus("");

      try {
        // EmailJS configuration
        const serviceId = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
        const templateId = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID
        const publicKey = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS public key

        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Arcenik Team",
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(""), 5000);
      } catch (error) {
        console.error("Email send failed:", error);
        setSubmitStatus("error");

        // Hide error message after 5 seconds
        setTimeout(() => setSubmitStatus(""), 5000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );

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

  // Handle book a meeting click
  const handleBookMeeting = useCallback(() => {
    toggleOverlay();
  }, [toggleOverlay]);

  // SSR fallback
  if (!isClient) {
    return (
      <section className="contact">
        <div className="contact-content">
          <div className="contact-loading">Loading contact page...</div>
        </div>
      </section>
    );
  }

  return (
    <ReactLenis root>
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

      <section className="contact">
        <div className="contact-content">
          <div className="contact-content-top">
            <div className="titlebox">
              <div className="titlebox-gradient" />
              <h1 className="headline white" ref={titleRef}>
                Get in Touch
              </h1>
            </div>
            <div className="contact-divider" ref={lineRef} />
          </div>

          <div className="contact-content-row">
            <div className="contact-content-left">
              <div className="contact-content-column">
                {/* Main contact card */}
                <div
                  className="contact-content-top-item opacity-blur"
                  ref={contactItem1}
                >
                  <div className="contact-content-top-item-profile">
                    <Image
                      src="/images/mockup4.webp"
                      width={80}
                      height={80}
                      className="contact-content-top-item-image"
                      alt="Contact profile"
                      loading="lazy"
                    />
                  </div>
                  <div className="contact-content-top-item-text">
                    <p className="description white">
                      Let&apos;s bring your idea to life. Reach out and get in
                      touch with management directly.
                    </p>
                  </div>
                </div>

                {/* Contact methods row */}
                <div className="contact-content-column-row">
                  {contactData.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <a
                        href={contact.href}
                        className="contact-content-small-item opacity-blur"
                        ref={
                          index === 0
                            ? contactItem2
                            : index === 1
                            ? contactItem3
                            : contactItem4
                        }
                        key={index}
                        target={
                          contact.href.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          contact.href.startsWith("http")
                            ? "noopener noreferrer"
                            : ""
                        }
                      >
                        <IconComponent
                          className="contact-content-small-item-icon"
                          strokeWidth={2.5}
                        />
                        <p className="small-description grey">
                          {contact.label}
                        </p>
                      </a>
                    );
                  })}
                </div>

                {/* Contact details */}
                <div
                  className="contact-content-item contact-content-item-clickable opacity-blur"
                  ref={contactItem5}
                  onClick={handleBookMeeting}
                >
                  <div className="contact-content-item-header">
                    <Video className="contact-content-item-icon" />
                    <p className="small-description grey">Meeting</p>
                  </div>
                  <p className="description white">Book a meeting</p>
                </div>

                <div
                  className="contact-content-item opacity-blur"
                  ref={contactItem6}
                >
                  <p className="small-description grey">Email</p>
                  <p className="description white">contact@arcenik.com</p>
                </div>

                <div
                  className="contact-content-item opacity-blur"
                  ref={contactItem7}
                >
                  <p className="small-description grey">Address</p>
                  <p className="description white">Vapi, Gujarat, India</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-content-right">
              <div className="contact-form-wrapper opacity-blur" ref={formRef}>
                <div className="contact-form-header">
                  <h2 className="subheadline white">Send us a message</h2>
                  <p className="description grey">
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label className="contact-form-label">
                        <User className="contact-form-icon" />
                        <span className="small-description grey">Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="contact-form-input"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="contact-form-group">
                      <label className="contact-form-label">
                        <Mail className="contact-form-icon" />
                        <span className="small-description grey">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="contact-form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      <MessageSquare className="contact-form-icon" />
                      <span className="small-description grey">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      <Send className="contact-form-icon" />
                      <span className="small-description grey">Message</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact-form-textarea"
                      placeholder="Tell us about your project..."
                      rows="5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="contact-form-submit"
                    disabled={isSubmitting}
                  >
                    <span className="contact-form-submit-text">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <Send className="contact-form-submit-icon" />
                  </button>

                  {submitStatus === "success" && (
                    <div className="contact-form-status contact-form-success">
                      <p>
                        Message sent successfully! We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="contact-form-status contact-form-error">
                      <p>
                        Failed to send message. Please try again or contact us
                        directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionFooter />
    </ReactLenis>
  );
};
