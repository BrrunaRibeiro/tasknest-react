import axios from 'axios';  

const api = axios.create({  
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/',  
  headers: {  
    'Content-Type': 'application/json',  
  },  
});  

// Add a request interceptor to include the token in headers  
api.interceptors.request.use((config) => {  
  const token = localStorage.getItem('token');  
  if (token) {  
    config.headers.Authorization = `Bearer ${token}`;  
  }  
  return config;  
});  

export default api;  