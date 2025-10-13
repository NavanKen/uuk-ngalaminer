import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { MapPin, Calendar, User, ArrowLeft } from "lucide-react";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";
import {
  getKulinerById,
  getAllKulinerPublic,
} from "../../service/kuliner.service";
import { Button } from "../../components/ui/button";

const KulinerDetailPage = () => {
  const { id } = useParams();
  const [kuliner, setKuliner] = useState(null);
  const [relatedKuliner, setRelatedKuliner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchKulinerDetail = async () => {
      setIsLoading(true);
      const res = await getKulinerById(id);

      if (res.status && res.data) {
        setKuliner(res.data);

        let relatedRes;

        if (res.data.id_category) {
          relatedRes = await getAllKulinerPublic({
            categoryId: res.data.id_category,
            limit: 10,
          });
        }

        if (
          !relatedRes?.status ||
          !relatedRes?.data ||
          relatedRes.data.length <= 1
        ) {
          relatedRes = await getAllKulinerPublic({
            limit: 10,
          });
        }

        if (relatedRes.status && relatedRes.data) {
          const filtered = relatedRes.data.filter(
            (k) => k.id_kuliner !== parseInt(id)
          );
          setRelatedKuliner(filtered.slice(0, 3));
        }
      }
      setIsLoading(false);
    };
    fetchKulinerDetail();
  }, [id]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
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

  if (!kuliner) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-muted-foreground">
              Kuliner tidak ditemukan
            </p>
            <Link to="/kuliner">
              <Button className="mt-4">Kembali ke Kuliner</Button>
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
            <Link to="/kuliner">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="size-4" />
                Kembali
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]"
            >
              <img
                src={kuliner.gambar}
                alt={kuliner.nama_kuliner}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 bg-clip-text text-transparent">
                  {kuliner.nama_kuliner}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  {kuliner.category?.icon && (
                    <div className="bg-orange-100 px-4 py-2 rounded-full flex items-center gap-2">
                      <img
                        src={kuliner.category.icon}
                        alt={kuliner.category.nama_category}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium text-[#FF6B35]">
                        {kuliner.category.nama_category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-3xl font-bold text-[#FF6B35] mb-6">
                  {formatRupiah(kuliner.harga)}
                </div>
              </div>

              <div className="space-y-4 bg-card p-6 rounded-xl border">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Lokasi</p>
                    <p className="text-muted-foreground">
                      {kuliner.lokasi?.nama_daerah || "-"}
                    </p>
                    {kuliner.lokasi?.alamat_lengkap && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {kuliner.lokasi.alamat_lengkap}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Ditambahkan</p>
                    <p className="text-muted-foreground">
                      {formatDate(kuliner.tanggal_ditambahkan)}
                    </p>
                  </div>
                </div>

                {kuliner.profile && (
                  <div className="flex items-start gap-3">
                    <User className="size-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Diposting oleh</p>
                      <div className="flex items-center gap-2">
                        {kuliner.profile.avatar_url && (
                          <img
                            src={kuliner.profile.avatar_url}
                            alt={kuliner.profile.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <p className="text-muted-foreground">
                          {kuliner.profile.username}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {kuliner.deskripsi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 bg-card p-8 rounded-xl border"
            >
              <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {kuliner.deskripsi}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Lihat Kuliner Lainnya</h2>

            {relatedKuliner.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedKuliner.map((item) => (
                  <Link
                    key={item.id_kuliner}
                    to={`/kuliner/${item.id_kuliner}`}
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={item.gambar}
                          alt={item.nama_kuliner}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#FF6B35] transition-colors">
                          {item.nama_kuliner}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          📍 {item.lokasi?.nama_daerah || "-"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FF6B35] font-bold">
                            {formatRupiah(item.harga)}
                          </span>
                          {item.profile?.username && (
                            <span className="text-xs text-muted-foreground">
                              oleh {item.profile.username}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-card p-12 rounded-xl border text-center">
                <p className="text-muted-foreground">
                  Belum ada kuliner lainnya untuk ditampilkan
                </p>
                <Link to="/kuliner">
                  <button className="mt-4 px-6 py-2 bg-[#FF6B35] hover:bg-[#E85C2A] text-white rounded-full transition-colors">
                    Lihat Semua Kuliner
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KulinerDetailPage;
