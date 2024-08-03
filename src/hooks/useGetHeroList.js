/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import twService from 'utils/services';

const useGetHeroBannerList = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await twService.get('banners/hero', {
          params
      });
      setData(response?.data);
    } catch (err) {
      console.log('Request canceled', err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    
  }, [params]);

  return { data, loading, error, fetchData };
};

export default useGetHeroBannerList;
