import { useState, useEffect, useCallback } from "react";
import { getLokasiPaginate } from "../service/lokasi.service";

export const useLokasiList = ({ search = "", limit = 12, page = 1 }) => {
  const [lokasiData, setLokasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchLokasi = useCallback(async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    const res = await getLokasiPaginate({ search, limit, offset });

    if (res.status) {
      setLokasiData(res.data);
      setTotal(res.count);
    }
    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    fetchLokasi();
  }, [fetchLokasi]);

  return {
    lokasiData,
    isLoading,
    total,
    refetch: fetchLokasi,
  };
};
