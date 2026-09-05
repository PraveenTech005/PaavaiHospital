// Centralized environment and hospital configuration constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const HOSPITAL_CONFIG = {
  name: import.meta.env.VITE_HOSPITAL_NAME || 'Paavai Hospital',
  tagline: import.meta.env.VITE_HOSPITAL_TAGLINE || 'Eye & Skin Care Hospital',
  location: import.meta.env.VITE_HOSPITAL_LOCATION || 'T S No 89, Indhira Nagar, Seelanaickenpatti, Salem, Tamil Nadu – 636201',
  shortLocation: 'Seelanaickenpatti, Salem – 636201',
  phone: import.meta.env.VITE_HOSPITAL_PHONE || '+91 80480 53215',
  phoneClean: (import.meta.env.VITE_HOSPITAL_PHONE || '+91 80480 53215').replace(/\s+/g, ''),
  mobile: import.meta.env.VITE_HOSPITAL_MOBILE || '+91 93427 90784',
  mobileClean: (import.meta.env.VITE_HOSPITAL_MOBILE || '+91 93427 90784').replace(/\s+/g, ''),
  email: import.meta.env.VITE_HOSPITAL_EMAIL || 'hospitalpaavai@gmail.com',
  est: import.meta.env.VITE_HOSPITAL_EST || '2025'
};
