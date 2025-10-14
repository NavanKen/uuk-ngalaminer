import { useState, useEffect, useCallback } from "react";
import {
  getKulinerById,
  getAllKulinerPublic,
} from "../service/kuliner.service";

export const useKulinerDetail = (id) => {
  const [kuliner, setKuliner] = useState(null);
  const [relatedKuliner, setRelatedKuliner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKulinerDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);

    const res = await getKulinerById(id);

    if (res.status && res.data) {
      setKuliner(res.data);

      let relatedRes;
      if (res.data.id_category) {
        relatedRes = await getAllKulinerPublic({
          categoryId: res.data.id_category,
          limit: 10,
        });
      }

      if (
        !relatedRes?.status ||
        !relatedRes?.data ||
        relatedRes.data.length <= 1
      ) {
        relatedRes = await getAllKulinerPublic({ limit: 10 });
      }

      if (relatedRes.status && relatedRes.data) {
        const filtered = relatedRes.data.filter(
          (k) => k.id_kuliner !== parseInt(id)
        );
        setRelatedKuliner(filtered.slice(0, 3));
      }
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchKulinerDetail();
  }, [fetchKulinerDetail]);

  return {
    kuliner,
    relatedKuliner,
    isLoading,
    refetch: fetchKulinerDetail,
  };
};
