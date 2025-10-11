import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    alt: "Pegunungan Batu",
  },
  {
    image:
      "https://xpscntm-asset-6aaa6adb24ad2493.s3.ap-southeast-1.amazonaws.com/2000625477092/Jatim-Park-1-Tickets-65be264f-c251-4202-abc0-3fe4c8364b13.jpeg",
    alt: "Jatim Park",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1600&q=80",
    alt: "Wisata Malang",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    alt: "Pantai Selatan",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
    alt: "Hidden Gem Malang",
  },
];

const Cta = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Mau Healing?
            </h1>

            <p className="text-lg md:text-xl text-white/95 mb-2 leading-relaxed">
              Yuk, jelajahi keindahan Malang bareng NgalamTrip! 🌿✨
            </p>

            <p className="text-base text-white/90 mb-4 leading-relaxed">
              Temukan beragam tempat wisata terbaik di Malang bersama NgalamTrip
              dan rasakan pengalaman liburan yang benar-benar menenangkan!
            </p>

            <button className="inline-flex items-center cursor-pointer gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <span>Mulai Sekarang</span>
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cta;
