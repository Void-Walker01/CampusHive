import axios from 'axios';

// Create a new axios instance with a custom configuration
const apiClient = axios.create({
  // This is the magic part that makes it work everywhere.
  // In production (on Vercel), it uses your VITE_API_URL.
  // In development (on your computer), it uses a relative path so the Vite proxy works.
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : '/api/v1',
  withCredentials: true, // This is crucial for sending cookies
});

export default apiClient;