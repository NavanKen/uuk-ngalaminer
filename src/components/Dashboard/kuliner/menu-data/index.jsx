import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import EditDialog from "../dialog/edit-dialog";
import DeleteDialog from "../dialog/delete-dialog";
import { useKuliner } from "../../../../hooks/use-kuliner";
import { useAuthStore } from "../../../../store/useAuthStore";
import { limitWords } from "../../../../lib/helper/limit";

const MenuData = ({ search, limit, page, onPageChange, onLimitChange }) => {
  const { authUser } = useAuthStore();
  const { menuData, isLoading, total } = useKuliner(
    search,
    limit,
    page,
    authUser?.id,
    authUser?.role
  );
  const totalPages = Math.ceil(total / limit);

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
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      <div className="">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-100 dark:bg-neutral-800">
                <TableHead className="py-5">No</TableHead>
                <TableHead className="py-5">Nama Kuliner</TableHead>
                <TableHead className="py-5">Kategori</TableHead>
                <TableHead className="py-5">Lokasi</TableHead>
                <TableHead className="py-5">Harga</TableHead>
                <TableHead className="py-5">Deskripsi</TableHead>
                <TableHead className="py-5">Tgl Ditambahkan</TableHead>
                <TableHead className="py-5 w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow
                    key={i}
                    className="bg-neutral-50 dark:bg-neutral-900"
                  >
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-6 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-32 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-48 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-20 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-20 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-32 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-20 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-6 py-3" />
                    </TableCell>
                  </TableRow>
                ))
              ) : menuData.length === 0 ? (
                <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                  <TableCell colSpan={8} className="text-center py-4">
                    Data tidak ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                menuData.map((menu, index) => (
                  <TableRow
                    key={index}
                    className="bg-neutral-50 dark:bg-neutral-900"
                  >
                    <TableCell className="py-3">{index + 1}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center lg:gap-3 flex-col lg:flex-row">
                        <img
                          src={menu.gambar}
                          alt={menu.nama_kuliner}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <span>{menu.nama_kuliner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      {menu.category?.nama_category || "-"}
                    </TableCell>
                    <TableCell className="py-3">
                      {menu.lokasi?.nama_daerah || "-"}
                    </TableCell>
                    <TableCell className="py-3">
                      {formatRupiah(menu.harga)}
                    </TableCell>
                    <TableCell className="py-3">
                      {limitWords(menu.deskripsi, 5)}
                    </TableCell>
                    <TableCell className="py-3">
                      {formatDate(menu.tanggal_ditambahkan)}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex gap-3">
                        <EditDialog
                          data={{
                            id: menu.id_kuliner,
                            nama_kuliner: menu.nama_kuliner,
                            id_category: menu.id_category,
                            id_lokasi: menu.id_lokasi,
                            harga: menu.harga,
                            deskripsi: menu.deskripsi,
                            detail_address: menu.detail_address,
                            jam_buka: menu.jam_buka,
                            jam_tutup: menu.jam_tutup,
                            gambar: menu.gambar,
                          }}
                        />

                        <DeleteDialog id={menu.id_kuliner} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center gap-2 justify-between mt-4 pb-7">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Limit
            </span>
            <Select
              value={String(limit)}
              onValueChange={(val) => onLimitChange(Number(val))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};
export default MenuData;
