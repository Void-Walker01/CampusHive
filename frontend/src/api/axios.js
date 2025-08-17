import axios from 'axios';

const apiClient = axios.create({
  // This is the corrected logic.
  // In production, it now correctly combines your VITE_API_URL with the '/api/v1' prefix.
  // In development, it still uses the relative path for the proxy.
  baseURL: import.meta.env.PROD 
    ? `${import.meta.env.VITE_API_URL}/api/v1` 
    : '/api/v1',
  withCredentials: true, // This is crucial for sending cookies
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we are retrying once
      try {
        // Make a request to your refresh token endpoint
        // NOTE: Use the full path since the interceptor might be called from anywhere
        await apiClient.post('/user/refresh');

        // If the refresh is successful, the new token is in the cookies.
        // Now, retry the original request that failed.
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        // If the refresh token is also invalid, then the session is truly expired.
        // You could add logic here to redirect the user to the login page.
        console.error("Session expired. Please log in again.");
        // Reject the promise to prevent the original call from proceeding
        return Promise.reject(refreshError);
      }
    }

    // For any other errors, just let them fail
    return Promise.reject(error);
  }
);

export default apiClient;
