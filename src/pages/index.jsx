import { useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/ui/navbar";
import Galery from "../components/LandingPages/Galery";
import Hero from "../components/LandingPages/hero";
import Rekomendasi from "../components/LandingPages/Rekomendasi";
import Footer from "../components/ui/footer";
import Cta from "../components/LandingPages/cta";

const LandingPages = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-background/80 via-background/75 to-background">
        <Hero />
        <Galery />
        <Rekomendasi />
        <Cta />
      </div>
      <Footer />
    </>
  );
};

export default LandingPages;
