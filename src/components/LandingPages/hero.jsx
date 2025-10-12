import { ChefHat } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/assets/hero.jpg"
            alt="Kuliner Daerah Malang"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/75 to-background" />
        </motion.div>

        <div className="relative z-10 pt-12 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 bg-clip-text text-transparent"
          >
            Temukan & Bagikan
            <br />
            Kuliner Favoritmu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-8"
          >
            Tempat berbagi rekomendasi kuliner dari seluruh Indonesia. Berbagi
            pengalaman dan temukan hidangan lezat di sekitarmu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/kuliner">
              <button className="inline-flex items-center gap-3 bg-[#FF6B35] hover:bg-[#E85C2A] text-white px-8 py-4 rounded-full font-semibold text-lg  transition-all duration-300 shadow-lg hover:shadow-xl group">
                <ChefHat className="w-5 h-5 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300" />
                <span>Jelajahi Kuliner</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
