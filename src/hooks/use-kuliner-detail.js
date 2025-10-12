import { useState, useEffect } from "react";
import {
  getKulinerById,
  getAllKulinerPublic,
} from "../service/kuliner.service";

export const useKulinerDetail = (id) => {
  const [kuliner, setKuliner] = useState(null);
  const [relatedKuliner, setRelatedKuliner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchKulinerDetail();
    }
  }, [id]);

  const fetchKulinerDetail = async () => {
    setIsLoading(true);
    const res = await getKulinerById(id);

    if (res.status && res.data) {
      setKuliner(res.data);

      // Fetch related kuliner - prioritize same category, fallback to all
      let relatedRes;

      if (res.data.id_category) {
        // Try to get from same category first
        relatedRes = await getAllKulinerPublic({
          categoryId: res.data.id_category,
          limit: 10,
        });
      }

      // If no results from same category, get random kuliner
      if (!relatedRes?.status || !relatedRes?.data || relatedRes.data.length <= 1) {
        relatedRes = await getAllKulinerPublic({
          limit: 10,
        });
      }

      if (relatedRes.status && relatedRes.data) {
        // Filter out current kuliner
        const filtered = relatedRes.data.filter(
          (k) => k.id_kuliner !== parseInt(id)
        );
        setRelatedKuliner(filtered.slice(0, 3));
      }
    }
    setIsLoading(false);
  };

  return {
    kuliner,
    relatedKuliner,
    isLoading,
    refetch: fetchKulinerDetail,
  };
};
