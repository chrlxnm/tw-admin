import { useEffect, useState } from "react";

import { CLASS_TIMES_URL } from "constant/paths";
import twService from "utils/services";

const useGetClassTimeList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await twService.get(CLASS_TIMES_URL);
      let formatArr = response?.data?.data?.map((item) => ({
        label: item,
        value: item,
      }));
      setData(formatArr);
    } catch (err) {
      console.log("Request canceled", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, fetchData };
};

export default useGetClassTimeList;
