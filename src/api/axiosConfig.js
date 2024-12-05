import axios from 'axios';

// Determine base URL based on environment
const isProduction = window.location.hostname !== 'localhost';
const apiBaseUrl = isProduction
  ? 'https://tasknest-backend-c911b6c54076.herokuapp.com/api/'
  : 'http://localhost:8000/api/';

// Create an Axios instance
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    // Don't add the Authorization header for login requests
    if (config.url.includes('login')) {
      return config; // Skip adding Authorization header for login
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and it's the first retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Make a request to refresh the access token
          const response = await axios.post(`${apiBaseUrl}token/refresh/`, {
            refresh: refreshToken,
          });

          // Save the new access token
          localStorage.setItem('access_token', response.data.access);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          // Clear tokens and redirect to login if refresh fails
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redirect user to login
        }
      } else {
        // No refresh token available; log out user
        window.location.href = '/login';
      }
    }

    // Reject promise if response is not due to expired token
    return Promise.reject(error);
  }
);

// Set the default Authorization header globally (optional)
if (localStorage.getItem('access_token')) {
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
}

export default api;
