// src/utils/fileApi.js
import axios from 'axios';

const fileApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Tambahkan interceptor auth (sama seperti apiService)
fileApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default fileApi;