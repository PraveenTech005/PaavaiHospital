import axios from 'axios';
import { API_BASE_URL } from './config';

// Normalize baseURL whether configured as full URL (e.g. http://localhost:5000/api) or relative path
const rawUrl = (API_BASE_URL || '/api').trim();
const baseURL = rawUrl.startsWith('http')
  ? (rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/+$/, '')}/api`)
  : (rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`);

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
