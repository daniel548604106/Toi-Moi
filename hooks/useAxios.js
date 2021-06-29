import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = `${process.env.BASE_URL}/api`;

const useAxios = ({
  method,
  url,
  body = null,
  dependency = [],
  token = Cookies.get('token')
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    axios[method](
      url,
      { headers: { Authorization: `Bearer ${token}` } },
      JSON.parse(body)
    )
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, ...dependency]);

  return { response, error, isLoading };
};

export default useAxios;
