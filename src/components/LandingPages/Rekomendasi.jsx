/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router";
import { getAllKulinerPublic } from "../../service/kuliner.service";

const Rekomendasi = () => {
  const [kulinerHighlight, setKulinerHighlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRandomKuliner();
  }, []);

  const fetchRandomKuliner = async () => {
    setIsLoading(true);
    try {
      const res = await getAllKulinerPublic({ limit: 50 });
      if (res.status && res.data && res.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setKulinerHighlight(res.data[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching kuliner:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading || !kulinerHighlight) {
    return (
      <div
        id="rekomendasi"
        className="min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
          <div className="space-y-6">
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 w-48 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-[500px] bg-gray-200 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="rekomendasi"
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight"
          >
            Jelajahi Kuliner Malang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-slate-600 text-lg font-medium leading-relaxed"
          >
            Nikmati beragam cita rasa khas Malang yang memadukan kelezatan
            tradisional dengan sentuhan modern. Dari bakso legendaris hingga
            olahan kopi di kafe estetik, setiap sudut kota ini siap memanjakan
            selera Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/kuliner`}
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300" />
              <span>Selengkapnya</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group"
        >
          <img
            src={kulinerHighlight.gambar}
            alt={kulinerHighlight.nama_kuliner}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 right-0 p-8 space-y-3"
          >
            {kulinerHighlight.category && (
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                {kulinerHighlight.category.nama_category}
              </div>
            )}

            <h3 className="text-3xl font-bold text-white">
              {kulinerHighlight.nama_kuliner}
            </h3>

            <p className="text-white/90 text-base leading-relaxed line-clamp-2">
              {kulinerHighlight.deskripsi}
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {kulinerHighlight.lokasi?.nama_daerah || "Malang"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">
                  {formatPrice(kulinerHighlight.harga)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rekomendasi;
