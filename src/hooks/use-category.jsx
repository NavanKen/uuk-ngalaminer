import { useCallback, useEffect, useState } from "react";
import {
  getKategoriPaginate,
  subscribeKategori,
} from "../service/category.service";

export const useKategori = (search, limit, page) => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    const res = await getKategoriPaginate({ search, limit, offset });

    if (res.status && res.data) {
      setMenuData(res.data);
      setTotal(res.count ?? 0);
    }

    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const unsub = subscribeKategori((payload) => {
      switch (payload.eventType) {
        case "INSERT": {
          const newData = payload.new;

          if (
            newData.nama_category.toLowerCase().includes(search.toLowerCase())
          ) {
            const offset = (page - 1) * limit;
            if (offset === 0) {
              setMenuData((prev) => [newData, ...prev].slice(0, limit));
              setTotal((prev) => prev + 1);
            } else {
              setTotal((prev) => prev + 1);
            }
          }
          break;
        }

        case "UPDATE": {
          const updated = payload.new;
          setMenuData((prev) =>
            prev.map((item) =>
              item.id_category === updated.id_category ? updated : item
            )
          );
          break;
        }

        case "DELETE": {
          const deleted = payload.old;
          setMenuData((prev) =>
            prev.filter((item) => item.id_category !== deleted.id_category)
          );
          setTotal((prev) => Math.max(prev - 1, 0));
          break;
        }
      }
    });

    return () => unsub();
  }, [search, limit, page]);

  return { menuData, isLoading, total, refetch: fetchData };
};
