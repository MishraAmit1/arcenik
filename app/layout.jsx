import "./globals.css";
import { Navigation } from "./Navigation";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://arceniktechnologies.com/"), // Replace with your actual domain
  title:
    "Arcenik | Website Development in Vapi, Gujarat | Web Design & Digital Solutions",
  description:
    "Professional website development company in Vapi, Silvassa, Valsad, Navsari. Expert web design, UI/UX design, and custom digital solutions for businesses in Gujarat and across India. Transform your vision into reality.",
  keywords:
    "website development in vapi, web design vapi, website developer vapi gujarat, web development company silvassa, website design valsad, digital solutions navsari, web developer gujarat india, UI UX design vapi, custom website development, professional web design gujarat, website development company vapi, web designer in vapi, best website developer vapi",
  authors: [{ name: "Arcenik" }],
  creator: "Arcenik",
  publisher: "Arcenik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      "Arcenik | Website Development in Vapi, Gujarat | Professional Web Design",
    description:
      "Leading website development company in Vapi, Gujarat. Expert web design and digital solutions for businesses in Silvassa, Valsad, Navsari and across India.",
    url: "https://arceniktechnologies.com/",
    siteName: "Arcenik",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Arcenik - Website Development in Vapi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcenik | Website Development in Vapi, Gujarat",
    description:
      "Professional website development and web design services in Vapi, Silvassa, Valsad, Gujarat.",
    images: ["/images/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://arceniktechnologies.com/",
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Vapi",
    "geo.position": "20.3893;72.9106",
    ICBM: "20.3893, 72.9106",
  },
};

// Enhanced JSON-LD Schema with complete local business markup
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://arceniktechnologies.com//#business",
      name: "Arcenik",
      alternateName: "Arcenik Web Development",
      description:
        "Professional website development company in Vapi, Gujarat offering web design, UI/UX design, and custom digital solutions for businesses.",
      url: "https://arceniktechnologies.com/",
      telephone: "+91-7777909218", // Add your actual phone number
      email: "contact@arcenik.com", // Add your actual email
      image: "https://arceniktechnologies.com/images/logo1.png",
      logo: "https://arceniktechnologies.com/images/logo1.png",
      sameAs: [
        // Add your social media URLs
        "https://www.facebook.com/arcenik",
        "https://www.instagram.com/arcenik",
        "https://www.linkedin.com/company/arcenik",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Your Street Address", // Add your actual address
        addressLocality: "Vapi",
        addressRegion: "Gujarat",
        postalCode: "396191",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.3893,
        longitude: 72.9106,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Vapi",
          "@id": "https://www.wikidata.org/wiki/Q1003804",
        },
        {
          "@type": "City",
          name: "Silvassa",
        },
        {
          "@type": "City",
          name: "Valsad",
        },
        {
          "@type": "City",
          name: "Navsari",
        },
        {
          "@type": "State",
          name: "Gujarat",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      priceRange: "₹₹",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Development",
              description:
                "Custom website development services in Vapi, Gujarat",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Design",
              description:
                "Professional web design services in Vapi, Silvassa, Valsad",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX Design",
              description: "User interface and experience design in Gujarat",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Solutions",
              description: "Custom digital solutions for businesses in India",
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "25",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://arceniktechnologies.com//#website",
      url: "https://arceniktechnologies.com/",
      name: "Arcenik",
      description: "Website development company in Vapi, Gujarat",
      publisher: {
        "@id": "https://arceniktechnologies.com//#business",
      },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://arceniktechnologies.com//search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://arceniktechnologies.com/",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://arceniktechnologies.com//#organization",
      name: "Arcenik",
      url: "https://arceniktechnologies.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://arceniktechnologies.com//images/logo1.png",
        width: 600,
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7777909218",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "gu"],
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#010101" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://arceniktechnologies.com/" />

        {/* Additional SEO meta tags */}
        <meta name="author" content="Arcenik" />
        <meta name="generator" content="Next.js" />

        {/* Local Business specific meta tags */}
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Vapi" />
        <meta name="geo.position" content="20.3893;72.9106" />
        <meta name="ICBM" content="20.3893, 72.9106" />

        {/* JSON-LD Schema */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />

        {/* Google Site Verification (add your verification code) */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
