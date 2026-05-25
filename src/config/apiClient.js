import axios from 'axios';

// 1. إنشاء نسخة مخصصة من Axios بإعدادات ثابتة
const apiClient = axios.create({
  baseURL: 'http://192.168.1.4:8000/api', 
  
  timeout: 10000, 
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default apiClient;