import { ArrowUpRight, MapPin } from "lucide-react";

const Rekomendasi = () => {
  const kulinerHighlight = {
    nama: "Bakso President Malang",
    kategori: "Makanan Tradisional",
    lokasi: "Kota Malang",
    harga: 25000,
    deskripsi:
      "Bakso legendaris dengan kuah gurih dan daging berkualitas premium yang sudah terkenal sejak puluhan tahun lalu",
    gambar:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80",
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-10 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
            Jelajahi Kuliner Malang
          </h1>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            Nikmati beragam cita rasa khas Malang yang memadukan kelezatan
            tradisional dengan sentuhan modern. Dari bakso legendaris hingga
            olahan kopi di kafe estetik, setiap sudut kota ini siap memanjakan
            selera Anda.
          </p>
          <button className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl group">
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300" />
            <span>Selengkapnya</span>
          </button>
        </div>

        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={kulinerHighlight.gambar}
            alt={kulinerHighlight.nama}
            className="w-full h-full object-cover transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
              {kulinerHighlight.kategori}
            </div>

            <h3 className="text-3xl font-bold text-white">
              {kulinerHighlight.nama}
            </h3>

            <p className="text-white/90 text-base leading-relaxed">
              {kulinerHighlight.deskripsi}
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {kulinerHighlight.lokasi}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">
                  {formatPrice(kulinerHighlight.harga)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rekomendasi;
