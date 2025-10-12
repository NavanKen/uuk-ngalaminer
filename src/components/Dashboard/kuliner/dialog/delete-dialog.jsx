import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { LokasiDelete } from "../../../../service/lokasi.service";

const DeleteDialog = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await LokasiDelete(id);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      setIsLoading(false);
      return;
    }

    toast.success(res?.pesan);
    setOpen(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="text-red-500 w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Hapus</DialogTitle>
          <DialogDescription>
            Yakin mau hapus ? Aksi ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
