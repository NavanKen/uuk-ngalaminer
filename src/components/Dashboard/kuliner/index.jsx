import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MenuData from "./menu-data";
import CreateDialog from "./dialog/create-dialog";

const Kuliner = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col md:items-center gap-3 justify-between">
          <h1 className="text-3xl font-bold">Manajamen Kuliner</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder="Search"
                className="py-5 px-9"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <CreateDialog />
          </div>
        </div>
        <div className="mt-10">
          <MenuData
            search={search}
            limit={limit}
            page={page}
            onPageChange={setPage}
            onLimitChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Kuliner;
