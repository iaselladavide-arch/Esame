import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const createApiClient = (token) => {
  const client = axios.create({
    baseURL,
    headers: token ? {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient;
