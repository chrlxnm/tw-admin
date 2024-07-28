import { useEffect, useState } from 'react';

import { CLASS_LIST_URL } from 'constant/paths';
import twService from 'utils/services';

const useGetClassList = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await twService.get(CLASS_LIST_URL, {
          params
      });
      setData(response.data);
    } catch (err) {
        console.log('Request canceled', err.message);
        setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return { data, loading, error, fetchData };
};

export default useGetClassList;
