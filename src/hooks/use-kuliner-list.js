import { useState, useEffect } from "react";
import { getAllKulinerPublic } from "../service/kuliner.service";

export const useKulinerList = ({
  search = "",
  categoryId = null,
  limit = 12,
  page = 1,
}) => {
  const [kulinerData, setKulinerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchKuliner();
  }, [search, categoryId, limit, page]);

  const fetchKuliner = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;

    const res = await getAllKulinerPublic({
      search,
      categoryId,
      limit,
      offset,
    });

    if (res.status) {
      setKulinerData(res.data);
      setTotal(res.count);
    }
    setIsLoading(false);
  };

  return {
    kulinerData,
    isLoading,
    total,
    refetch: fetchKuliner,
  };
};
