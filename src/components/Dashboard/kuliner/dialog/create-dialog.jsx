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

    if (kategoriRes.status) {
      setKategoriList(kategoriRes.data);
    }

    if (lokasiRes.status) {
      setLokasiList(lokasiRes.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Harap Masukkan file/gambar");
      return;
    }

    if (!formData.id_category || !formData.id_lokasi) {
      toast.error("Harap pilih kategori dan lokasi");
      return;
    }

    setIsLoading(true);

    const inserData = {
      nama_kuliner: formData.nama_kuliner,
      id_category: parseInt(formData.id_category),
      id_lokasi: parseInt(formData.id_lokasi),
      harga: parseFloat(formData.harga),
      deskripsi: formData.deskripsi,
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
      setFormData((prev) => ({
        ...prev,
        file,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-5 px-6 bg-gradient-to-r from-orange-600 to-red-600">
          Buat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat Kuliner Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Kuliner
              </label>
              <Input
                className="py-5"
                name="nama_kuliner"
                placeholder="Masukkan nama kuliner"
                value={formData.nama_kuliner}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Kategori
              </label>
              <Select
                name="id_category"
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

            <div>
              <label className="block text-sm font-medium mb-1">Lokasi</label>
              <Select
                name="id_lokasi"
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

            <div>
              <label className="block text-sm font-medium mb-1">Harga</label>
              <Input
                className="py-5"
                type="number"
                name="harga"
                placeholder="Masukkan harga"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Deskripsi
              </label>
              <Textarea
                className="resize-none"
                name="deskripsi"
                placeholder="Masukkan deskripsi kuliner"
                value={formData.deskripsi}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Gambar Kuliner
              </label>
              <div className="flex items-center gap-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    width={160}
                    height={60}
                    className="rounded-md object-cover"
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

            <Button type="submit" disabled={isLoading ? true : false}>
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
