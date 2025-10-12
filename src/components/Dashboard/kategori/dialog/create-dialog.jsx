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
import { LokasiCreate } from "../../../../service/lokasi.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KategoriCreate } from "../../../../service/category.service";

const CreateDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    nama_category: "",
    keterangan: "",
    is_active: "",
    file: null,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        alamat_lengkap: "",
        deskripsi_daerah: "",
        file: null,
      });
      setPreview(null);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Harap Masukkan file/gambar");
      return;
    }

    setIsLoading(true);

    const inserData = {
      nama_category: formData.nama_category,
      keterangan: formData.keterangan,
      is_active: formData.is_active,
      file: formData.file,
    };

    const res = await KategoriCreate(inserData);

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
          <DialogTitle>Buat Kategori Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Kategori
              </label>
              <Input
                className="py-5"
                name="nama_category"
                placeholder="Masukkan nama kategori"
                value={formData.nama_daerah}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Keterangan
              </label>
              <Input
                className="py-5"
                type="text"
                name="keterangan"
                placeholder="Masukkan Keterangan"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select
                name="is_active"
                value={formData.is_active}
                onValueChange={(value) =>
                  handleChange({ target: { name: "is_active", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Non-Aktif</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Textarea
                className="resize-none"
                type="text"
                name="deskripsi_daerah"
                placeholder="Masukkan Dekripsi Daerah"
                value={formData.stock}
                onChange={handleChange}
              /> */}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
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
