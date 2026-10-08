import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if present in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (userData) => API.post('/auth/signup', userData);
export const verifyOtp = (otpData) => API.post('/auth/verify-otp', otpData);

// ML Prediction endpoint
export const predictPersona = (payload) => API.post('/predict', payload);

// Contact form endpoint
export const sendContactMessage = (messageData) => API.post('/contact', messageData);

export default API;