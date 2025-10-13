import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";
import { Input } from "../../components/ui/input";
import { getAllLokasiPublic } from "../../service/lokasi.service";

const LokasiPage = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [lokasiData, setLokasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchLokasi = async () => {
      setIsLoading(true);
      const offset = (page - 1) * limit;
      const res = await getAllLokasiPublic({
        search,
        limit,
        offset,
      });

      if (res.status) {
        setLokasiData(res.data);
        setTotal(res.count);
      }
      setIsLoading(false);
    };
    fetchLokasi();
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl leading-tight font-bold mb-4 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 bg-clip-text text-transparent">
              Jelajahi Lokasi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan berbagai lokasi kuliner menarik di berbagai daerah
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <Input
                type="text"
                placeholder="Cari lokasi..."
                className="pl-10 py-6 text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="w-full h-64 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : lokasiData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                Tidak ada lokasi ditemukan
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {lokasiData.map((lokasi, index) => (
                <motion.div
                  key={lokasi.id_lokasi}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/lokasi/${lokasi.id_lokasi}`}>
                    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full">
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={lokasi.gambar}
                          alt={lokasi.nama_daerah}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-[#FF6B35] transition-colors">
                            {lokasi.nama_daerah}
                          </h3>
                          {lokasi.alamat_lengkap && (
                            <p className="text-white/90 text-sm flex items-start gap-2">
                              <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">
                                {lokasi.alamat_lengkap}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      {lokasi.deskripsi_daerah && (
                        <div className="p-6">
                          <p className="text-muted-foreground line-clamp-3">
                            {lokasi.deskripsi_daerah}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && lokasiData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Halaman {page} dari {totalPages}
                </span>
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LokasiPage;
