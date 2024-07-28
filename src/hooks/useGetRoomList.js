import { useEffect, useState } from "react";

import { ROOM_LIST_URL } from "constant/paths";
import twService from "utils/services";

const useGetRoomList = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataList = async () => {
    setLoading(true);
    try {
      const response = await twService.get(ROOM_LIST_URL, {
        params: params,
      });
      setData(response.data);
    } catch (err) {
      console.log("Request canceled", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataList();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return { data, loading, error, fetchDataList };
};

export default useGetRoomList;
