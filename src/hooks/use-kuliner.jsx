import { useCallback, useEffect, useState } from "react";
import {
  getKulinerPaginate,
  subscribeKuliner,
  getKulinerById,
} from "../service/kuliner.service";

export const useKuliner = (search, limit, page, userId = null, role = null) => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    const res = await getKulinerPaginate({ search, limit, offset, userId, role });

    if (res.status && res.data) {
      setMenuData(res.data);
      setTotal(res.count ?? 0);
    }

    setIsLoading(false);
  }, [search, limit, page, userId, role]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const unsub = subscribeKuliner(async (payload) => {
      switch (payload.eventType) {
        case "INSERT": {
          const newData = payload.new;

          if (
            newData.nama_kuliner.toLowerCase().includes(search.toLowerCase())
          ) {
            // Fetch data lengkap dengan relasi
            const fullDataRes = await getKulinerById(newData.id_kuliner);
            
            if (fullDataRes.status && fullDataRes.data) {
              const offset = (page - 1) * limit;
              if (offset === 0) {
                setMenuData((prev) => [fullDataRes.data, ...prev].slice(0, limit));
                setTotal((prev) => prev + 1);
              } else {
                setTotal((prev) => prev + 1);
              }
            }
          }
          break;
        }

        case "UPDATE": {
          const updated = payload.new;
          
          // Fetch data lengkap dengan relasi
          const fullDataRes = await getKulinerById(updated.id_kuliner);
          
          if (fullDataRes.status && fullDataRes.data) {
            setMenuData((prev) =>
              prev.map((item) =>
                item.id_kuliner === updated.id_kuliner ? fullDataRes.data : item
              )
            );
          }
          break;
        }

        case "DELETE": {
          const deleted = payload.old;
          setMenuData((prev) =>
            prev.filter((item) => item.id_kuliner !== deleted.id_kuliner)
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
