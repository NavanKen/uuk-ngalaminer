import { useState, useEffect } from "react";
import { getLokasiPaginate } from "../service/lokasi.service";

export const useLokasiList = ({
  search = "",
  limit = 12,
  page = 1,
}) => {
  const [lokasiData, setLokasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchLokasi();
  }, [search, limit, page]);

  const fetchLokasi = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;

    const res = await getLokasiPaginate({
      search,
      limit,
      offset,
    });

    if (res.status) {
      setLokasiData(res.data);
      setTotal(res.count);
    }
    setIsLoading(false);
  };

  return {
    lokasiData,
    isLoading,
    total,
    refetch: fetchLokasi,
  };
};
