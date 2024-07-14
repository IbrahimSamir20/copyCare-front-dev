import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL +
    ':' +
    import.meta.env.VITE_API_PORT +
    '/' +
    import.meta.env.VITE_API_PREFIX +
    '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-tenant-id'] = location.pathname.split('/')[1];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    } else if (error.response.status === 409) {
      toast.error(error.response.data.message, {
        id: '409',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

function getToken() {
  return localStorage.getItem('token');
}
