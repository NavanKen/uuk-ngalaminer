import { useState, useEffect } from "react";
import { getLokasiById } from "../service/lokasi.service";
import { getKulinerByLokasi } from "../service/kuliner.service";

export const useLokasiDetail = (id) => {
  const [lokasi, setLokasi] = useState(null);
  const [kulinerList, setKulinerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLokasiDetail();
    }
  }, [id]);

  const fetchLokasiDetail = async () => {
    setIsLoading(true);
    const res = await getLokasiById(id);

    if (res.status && res.data) {
      setLokasi(res.data);

      // Fetch kuliner from this location
      const kulinerRes = await getKulinerByLokasi(id, 6);
      if (kulinerRes.status) {
        setKulinerList(kulinerRes.data);
      }
    }
    setIsLoading(false);
  };

  return {
    lokasi,
    kulinerList,
    isLoading,
    refetch: fetchLokasiDetail,
  };
};
