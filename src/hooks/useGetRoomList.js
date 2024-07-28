import { useEffect, useState } from 'react';

import { ROOM_LIST_URL } from 'constant/paths';
import twService from 'utils/services';

const useGetRoomList = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await twService.get(ROOM_LIST_URL, {
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
    fetchData();
    
  }, [params]);

  return { data, loading, error };
};

export default useGetRoomList;
