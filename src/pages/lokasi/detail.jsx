import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { MapPin, ArrowLeft } from "lucide-react";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";
import { getLokasiById } from "../../service/lokasi.service";
import { getKulinerByLokasi } from "../../service/kuliner.service";
import { Button } from "../../components/ui/button";

const LokasiDetailPage = () => {
  const { id } = useParams();
  const [lokasi, setLokasi] = useState(null);
  const [kulinerList, setKulinerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchLokasiDetail = async () => {
      setIsLoading(true);
      const res = await getLokasiById(id);

      if (res.status && res.data) {
        setLokasi(res.data);
        const kulinerRes = await getKulinerByLokasi(id);
        if (kulinerRes.status) {
          setKulinerList(kulinerRes.data);
        }
      }
      setIsLoading(false);
    };
    fetchLokasiDetail();
  }, [id]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-96 bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!lokasi) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-muted-foreground">
              Lokasi tidak ditemukan
            </p>
            <Link to="/lokasi">
              <Button className="mt-4">Kembali ke Lokasi</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link to="/lokasi">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="size-4" />
                Kembali
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] mb-8"
          >
            <img
              src={lokasi.gambar}
              alt={lokasi.nama_daerah}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {lokasi.nama_daerah}
              </h1>
              {lokasi.alamat_lengkap && (
                <div className="flex items-start gap-2 text-white/90">
                  <MapPin className="size-5 mt-0.5 flex-shrink-0" />
                  <p className="text-lg">{lokasi.alamat_lengkap}</p>
                </div>
              )}
            </div>
          </motion.div>

          {lokasi.deskripsi_daerah && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 bg-card p-8 rounded-xl border"
            >
              <h2 className="text-2xl font-bold mb-4">Tentang Lokasi</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {lokasi.deskripsi_daerah}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Rekomendasi Kuliner dari Lokasi Ini
            </h2>

            {kulinerList.length === 0 ? (
              <div className="bg-card p-12 rounded-xl border text-center">
                <p className="text-muted-foreground">
                  Belum ada kuliner dari lokasi ini
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kulinerList.map((kuliner) => (
                  <Link
                    key={kuliner.id_kuliner}
                    to={`/kuliner/${kuliner.id_kuliner}`}
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={kuliner.gambar}
                          alt={kuliner.nama_kuliner}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {kuliner.category && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                              {kuliner.category.icon && (
                                <img
                                  src={kuliner.category.icon}
                                  alt={kuliner.category.nama_category}
                                  className="w-4 h-4 object-contain"
                                />
                              )}
                              <span className="text-xs font-medium">
                                {kuliner.category.nama_category}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#FF6B35] transition-colors">
                          {kuliner.nama_kuliner}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FF6B35] font-bold text-lg">
                            {formatRupiah(kuliner.harga)}
                          </span>
                          {kuliner.profile?.username && (
                            <span className="text-xs text-muted-foreground">
                              oleh {kuliner.profile.username}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LokasiDetailPage;
