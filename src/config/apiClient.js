import axios from 'axios';

// 1. إنشاء نسخة مخصصة من Axios بإعدادات ثابتة
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', 
  
  // وقت الانتظار الأقصى للطلب (10 ثوانٍ)
  timeout: 10000, 
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});