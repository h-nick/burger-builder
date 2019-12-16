import { useState, useEffect } from 'react';

export default (axios) => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = axios.interceptors.response.use(response => response, error => {
    setError(error);
  });

  const errorConfirmedHandler = () => {
    setError(null);
  }

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(reqInterceptor);
    }
  }, [axios.interceptors.request, axios.interceptors.response, reqInterceptor, resInterceptor]);

  return [error, errorConfirmedHandler];
}