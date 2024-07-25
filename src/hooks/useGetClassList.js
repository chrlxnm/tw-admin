import { useEffect, useState } from 'react';

import { CLASS_LIST_URL } from 'constant/paths';
import twService from 'utils/services';

const useGetClassList = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await twService.get(CLASS_LIST_URL, {
            params
        });
        setData(response.data);
      } catch (err) {
        if (twService.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, [params]);

  return { data, loading, error };
};

export default useGetClassList;
