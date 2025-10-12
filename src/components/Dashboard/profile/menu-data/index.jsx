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
import { Badge } from "@/components/ui/badge";
import { useProfile } from "../../../../hooks/use-profile";
import EditDialog from "../dialog/edit-dialog";
import DeleteDialog from "../dialog/delete-dialog";

const MenuData = ({
  search,
  limit,
  page,
  roleFilter,
  onPageChange,
  onLimitChange,
}) => {
  const { menuData, isLoading, total } = useProfile(
    search,
    limit,
    page,
    roleFilter
  );
  const totalPages = Math.ceil(total / limit);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-100 dark:bg-neutral-800">
                <TableHead className="py-5">No</TableHead>
                <TableHead className="py-5">Avatar</TableHead>
                <TableHead className="py-5">Username</TableHead>
                <TableHead className="py-5">Phone</TableHead>
                <TableHead className="py-5">Role</TableHead>
                <TableHead className="py-5">Created At</TableHead>
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
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-32 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-28 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-6 w-16 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-4 w-24 py-3" />
                    </TableCell>
                    <TableCell className="py-3">
                      <Skeleton className="h-8 w-8 py-3" />
                    </TableCell>
                  </TableRow>
                ))
              ) : menuData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Tidak ada data profile
                  </TableCell>
                </TableRow>
              ) : (
                menuData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="bg-neutral-50 dark:bg-neutral-900"
                  >
                    <TableCell className="py-3">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell className="py-3">
                      {item.avatar_url ? (
                        <img
                          src={item.avatar_url}
                          alt={item.username}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-semibold">
                          {item.username?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      {item.username || "-"}
                    </TableCell>
                    <TableCell className="py-3">{item.phone || "-"}</TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant={
                          item.role === "admin" ? "default" : "secondary"
                        }
                        className={
                          item.role === "admin"
                            ? "bg-[#FF6B35] hover:bg-[#E85C2A]"
                            : ""
                        }
                      >
                        {item.role || "user"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-muted-foreground">
                      {formatDate(item.created_at)}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex gap-2">
                        <EditDialog data={item} />
                        <DeleteDialog data={item} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && totalPages > 0 && (
          <div className="w-full mt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page:
                </span>
                <Select
                  value={String(limit)}
                  onValueChange={(value) => onLimitChange(Number(value))}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuData;
