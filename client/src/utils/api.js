import axios from 'axios';

// Base API URL configuration from environment variables or fallback to relative '/api' proxy
const baseURL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Network communication error. Please try again.';
    
    // Attach user-friendly parsed error message
    error.userMessage = customMessage;
    return Promise.reject(error);
  }
);

export default api;
