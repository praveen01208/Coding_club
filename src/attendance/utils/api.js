import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach JWT token to every request
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('cc_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auto logout on 401
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && !err.config.url.includes('/auth/login')) {
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default API;
