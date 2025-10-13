import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useKulinerList } from "../../hooks/use-kuliner-list";
import { useCategories } from "../../hooks/use-categories";

const KulinerPage = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { categories, isLoading } = useCategories();
  const { kulinerData, total } = useKulinerList({
    search,
    categoryId: categoryFilter === "all" ? null : parseInt(categoryFilter),
    limit,
    page,
  });

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl leading-tight font-bold mb-4 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 bg-clip-text text-transparent">
              Jelajahi Kuliner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan berbagai kuliner lezat dari seluruh daerah
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <Input
                type="text"
                placeholder="Cari kuliner..."
                className="pl-10 py-6 text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Select
                value={categoryFilter}
                onValueChange={(val) => {
                  setCategoryFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[200px] py-6">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id_category}
                      value={String(cat.id_category)}
                    >
                      {cat.nama_category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="w-full h-48 bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : kulinerData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                Tidak ada kuliner ditemukan
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {kulinerData.map((kuliner, index) => (
                <motion.div
                  key={kuliner.id_kuliner}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/kuliner/${kuliner.id_kuliner}`}>
                    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={kuliner.gambar}
                          alt={kuliner.nama_kuliner}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          {kuliner.category?.icon && (
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                              <img
                                src={kuliner.category.icon}
                                alt={kuliner.category.nama_category}
                                className="w-4 h-4 object-contain"
                              />
                              <span className="text-xs font-medium">
                                {kuliner.category.nama_category}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#FF6B35] transition-colors">
                          {kuliner.nama_kuliner}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          📍 {kuliner.lokasi?.nama_daerah || "-"}
                        </p>
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
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && kulinerData.length > 0 && (
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

export default KulinerPage;
