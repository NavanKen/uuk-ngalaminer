import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteProfile } from "../../../../service/profile.service";

const DeleteDialog = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const res = await deleteProfile(data.id);

      if (res.status) {
        toast.success("Profile berhasil dihapus");
        setOpen(false);
      } else {
        toast.error(res.error?.message || "Gagal menghapus profile");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Profile</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus profile ini? User akan dihapus dari auth dan tidak bisa login lagi.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            {data.avatar_url ? (
              <img
                src={data.avatar_url}
                alt={data.username}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-semibold">
                {data.username?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div>
              <p className="font-semibold">{data.username}</p>
              <p className="text-sm text-muted-foreground">{data.phone || "No phone"}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
