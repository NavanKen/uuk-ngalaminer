import { useState, useEffect, useCallback } from "react";
import { getLokasiById } from "../service/lokasi.service";
import { getKulinerByLokasi } from "../service/kuliner.service";

export const useLokasiDetail = (id) => {
  const [lokasi, setLokasi] = useState(null);
  const [kulinerList, setKulinerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLokasiDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);

    const res = await getLokasiById(id);
    if (res.status && res.data) {
      setLokasi(res.data);
      const kulinerRes = await getKulinerByLokasi(id, 6);
      if (kulinerRes.status) {
        setKulinerList(kulinerRes.data);
      }
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLokasiDetail();
  }, [fetchLokasiDetail]);

  return {
    lokasi,
    kulinerList,
    isLoading,
    refetch: fetchLokasiDetail,
  };
};
