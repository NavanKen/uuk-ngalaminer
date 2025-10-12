import { useState, useEffect } from "react";
import { getAllKategoriPublic } from "../service/kuliner.service";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getAllKategoriPublic();
      if (res.status) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    isLoading,
    refetch: fetchCategories,
  };
};
