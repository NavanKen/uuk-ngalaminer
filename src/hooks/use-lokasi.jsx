import { useCallback, useEffect, useState } from "react";
import { getLokasiPaginate, subscribeLokasi } from "../service/lokasi.service";

export const useLokasi = (search, limit, page) => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    const res = await getLokasiPaginate({ search, limit, offset });

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
    const unsub = subscribeLokasi((payload) => {
      switch (payload.eventType) {
        case "INSERT": {
          const newData = payload.new;

          if (
            newData.nama_daerah.toLowerCase().includes(search.toLowerCase())
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
              item.id_lokasi === updated.id_lokasi ? updated : item
            )
          );
          break;
        }

        case "DELETE": {
          const deleted = payload.old;
          setMenuData((prev) =>
            prev.filter((item) => item.id_lokasi !== deleted.id_lokasi)
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
