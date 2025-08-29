import "./about.css";
import { AboutPageSection } from "./AboutPageSection";

export const metadata = {
  title: "Arcenik | About Us",
  description:
    "Harnessing Cutting-Edge Visualization Technology to Transform Vision into Tailored Digital Reality.",
  openGraph: {
    title: "About Us",
  },
};

const About = () => {
  return <AboutPageSection />;
};

export default About;
