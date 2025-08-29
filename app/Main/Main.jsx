import dynamic from "next/dynamic";
import "./main.css";

// Static hero section - immediate load
import { SectionHero } from "./SectionHero";

// Dynamic imports with built-in loading
const LenisWrapper = dynamic(() => import("./LenisWrapper"), {
  ssr: false,
});
// Main.jsx mein ye changes karo:

const SectionServices = dynamic(
  () =>
    import("./SectionServices").then((mod) => ({
      default: mod.SectionServices,
    })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionProjects = dynamic(
  () =>
    import("./SectionProjects").then((mod) => ({
      default: mod.SectionProjects,
    })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionProjectsMobile = dynamic(
  () =>
    import("./SectionProjectsMobile").then((mod) => ({
      default: mod.SectionProjectsMobile,
    })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionTechstack = dynamic(
  () =>
    import("./SectionTechstack").then((mod) => ({
      default: mod.SectionTechstack,
    })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionTestimonials = dynamic(
  () =>
    import("./SectionTestimonials").then((mod) => ({
      default: mod.SectionTestimonials,
    })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionKPI = dynamic(
  () => import("./SectionKPI").then((mod) => ({ default: mod.SectionKPI })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

const SectionFooter = dynamic(
  () =>
    import("./SectionFooter").then((mod) => ({ default: mod.SectionFooter })),
  {
    loading: () => <SectionLoader />,
    ssr: false, // Add this line
  }
);

// Lightweight CSS loader
const SectionLoader = () => (
  <div className="section-loader">
    <div className="section-loader-spinner"></div>
  </div>
);

export default function Main() {
  return (
    <>
      {/* Hero loads immediately with SSR */}
      <SectionHero />

      {/* Everything else loads progressively */}
      <LenisWrapper>
        <div className="normal-padding" />

        <div className="border-padding">
          <div className="section-border"></div>
        </div>

        <SectionServices />
        <div className="normal-padding" />

        <SectionProjects />
        <SectionProjectsMobile />
        <div className="normal-padding" />

        <SectionTechstack />
        <div className="normal-padding" />

        <SectionTestimonials />
        <div className="normal-padding" />

        <SectionKPI />
        <div className="normal-padding" />

        {/* <SectionFlower /> */}
        <div className="normal-padding" />

        <SectionFooter />
      </LenisWrapper>
    </>
  );
}
