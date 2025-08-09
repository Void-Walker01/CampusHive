import axios from 'axios';

// Create a new axios instance with the corrected configuration
const apiClient = axios.create({
  // This is the corrected logic.
  // In production, it now correctly combines your VITE_API_URL with the '/api/v1' prefix.
  // In development, it still uses the relative path for the proxy.
  baseURL: import.meta.env.PROD 
    ? `${import.meta.env.VITE_API_URL}/api/v1` 
    : '/api/v1',
  withCredentials: true, // This is crucial for sending cookies
});

export default apiClient;
