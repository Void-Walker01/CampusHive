import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.PROD 
    ? `${import.meta.env.VITE_API_URL}/api/v1` 
    : '/api/v1',
  withCredentials: true, // Important for sending cookies
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error response exists (network errors won't have one)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Only try refresh if we think user *should* have a session
        const hasRefresh = document.cookie.includes("refreshToken"); 
        // ^ replace with your own way of checking if a refresh token exists (cookie/localStorage)

        if (!hasRefresh) {
          return Promise.reject(error);
        }

        // Attempt token refresh
        await apiClient.post('/user/refresh');

        // Retry the original request with new session
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        // Optionally redirect to login page here
        return Promise.reject(refreshError);
      }
    }

    // For all other errors
    return Promise.reject(error);
  }
);

export default apiClient;
