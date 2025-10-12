import { useState, useEffect } from "react";
import {
  getProfilePaginate,
  subscribeProfile,
  getProfileById,
} from "../service/profile.service";

export const useProfile = (search = "", limit = 10, page = 1, roleFilter = null) => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, [search, limit, page, roleFilter]);

  // Real-time subscription
  useEffect(() => {
    const unsub = subscribeProfile(async (payload) => {
      switch (payload.eventType) {
        case "INSERT": {
          const newData = payload.new;
          
          // Check if matches current filters
          const matchesSearch = 
            !search ||
            newData.username?.toLowerCase().includes(search.toLowerCase()) ||
            newData.phone?.toLowerCase().includes(search.toLowerCase());
          
          const matchesRole = !roleFilter || newData.role === roleFilter;
          
          if (matchesSearch && matchesRole) {
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
          
          // Fetch full data
          const fullDataRes = await getProfileById(updated.id);
          
          if (fullDataRes.status && fullDataRes.data) {
            setMenuData((prev) =>
              prev.map((item) =>
                item.id === updated.id ? fullDataRes.data : item
              )
            );
          }
          break;
        }

        case "DELETE": {
          const deleted = payload.old;
          setMenuData((prev) => prev.filter((item) => item.id !== deleted.id));
          setTotal((prev) => Math.max(prev - 1, 0));
          break;
        }
      }
    });

    return () => unsub();
  }, [search, limit, page, roleFilter]);

  const fetchData = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    const res = await getProfilePaginate({
      search,
      limit,
      offset,
      role: roleFilter,
    });

    if (res.status) {
      setMenuData(res.data);
      setTotal(res.count);
    }
    setIsLoading(false);
  };

  return { menuData, isLoading, total, refetch: fetchData };
};
