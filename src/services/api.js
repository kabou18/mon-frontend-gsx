// frontend/src/services/api.js
import axios from 'axios';

// Re-build to clear cache and use updated env variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
