import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  KulinerCreate,
  getAllKategori,
  getAllLokasi,
} from "../../../../service/kuliner.service";
import { useAuthStore } from "../../../../store/useAuthStore";

const CreateDialog = () => {
  const { authUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);
  const [lokasiList, setLokasiList] = useState([]);
  const [formData, setFormData] = useState({
    nama_kuliner: "",
    id_category: "",
    id_lokasi: "",
    harga: "",
    deskripsi: "",
    detail_address: "",
    jam_buka: "",
    jam_tutup: "",
    file: null,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        nama_kuliner: "",
        id_category: "",
        id_lokasi: "",
        harga: "",
        deskripsi: "",
        detail_address: "",
        jam_buka: "",
        jam_tutup: "",
        file: null,
      });
      setPreview(null);
      fetchKategoriAndLokasi();
    }
  }, [open]);

  const fetchKategoriAndLokasi = async () => {
    const [kategoriRes, lokasiRes] = await Promise.all([
      getAllKategori(),
      getAllLokasi(),
    ]);

    if (kategoriRes.status) setKategoriList(kategoriRes.data);
    if (lokasiRes.status) setLokasiList(lokasiRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return toast.error("Harap Masukkan file/gambar");
    if (!formData.id_category || !formData.id_lokasi)
      return toast.error("Harap pilih kategori dan lokasi");

    setIsLoading(true);

    const inserData = {
      nama_kuliner: formData.nama_kuliner,
      id_category: parseInt(formData.id_category),
      id_lokasi: parseInt(formData.id_lokasi),
      harga: parseFloat(formData.harga),
      deskripsi: formData.deskripsi,
      detail_address: formData.detail_address,
      jam_buka: formData.jam_buka,
      jam_tutup: formData.jam_tutup,
      file: formData.file,
      id_profile: authUser?.id,
    };

    const res = await KulinerCreate(inserData);

    if (!res.status) {
      toast.error(res.pesan);
      setIsLoading(false);
      return;
    }

    toast.success(res.pesan);
    setIsLoading(false);
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-5 px-6 bg-gradient-to-r from-orange-600 to-red-600">
          Buat
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Kuliner Baru</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nama Kuliner</label>
              <Input
                name="nama_kuliner"
                placeholder="Masukkan nama kuliner"
                value={formData.nama_kuliner}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Harga</label>
              <Input
                type="number"
                name="harga"
                placeholder="Masukkan harga"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Kategori</label>
              <Select
                value={formData.id_category}
                onValueChange={(value) =>
                  handleChange({ target: { name: "id_category", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    {kategoriList.map((kategori) => (
                      <SelectItem
                        key={kategori.id_category}
                        value={String(kategori.id_category)}
                      >
                        {kategori.nama_category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Lokasi</label>
              <Select
                value={formData.id_lokasi}
                onValueChange={(value) =>
                  handleChange({ target: { name: "id_lokasi", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lokasi</SelectLabel>
                    {lokasiList.map((lokasi) => (
                      <SelectItem
                        key={lokasi.id_lokasi}
                        value={String(lokasi.id_lokasi)}
                      >
                        {lokasi.nama_daerah}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <Textarea
                name="deskripsi"
                placeholder="Masukkan deskripsi kuliner"
                value={formData.deskripsi}
                onChange={handleChange}
                className="resize-none"
                rows={2}
              />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-medium">Detail Alamat</label>
              <Textarea
                name="detail_address"
                placeholder="Contoh: Dekat masjid Al-Falah, sebelah kiri toko roti"
                value={formData.detail_address}
                onChange={handleChange}
                className="resize-none"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Jam Buka</label>
              <Input
                type="time"
                name="jam_buka"
                value={formData.jam_buka}
                onChange={handleChange}
                step="60"
                className="[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Jam Tutup</label>
              <Input
                type="time"
                name="jam_tutup"
                value={formData.jam_tutup}
                onChange={handleChange}
                step="60"
                className="[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-medium">Gambar Kuliner</label>
              <div className="flex items-center gap-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-[160px] h-[60px] object-cover rounded-md"
                  />
                ) : (
                  <div className="w-[160px] h-[60px] flex items-center justify-center rounded-md border border-dashed">
                    <ImageIcon />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memuat...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
