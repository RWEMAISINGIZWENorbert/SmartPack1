import axios from 'axios';

// Create a professional axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for sending/receiving cookies (accessToken)
});

// Optional: Add a response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error has a message from the backend, use it
    const message = error.response?.data?.msg || "Something went wrong";
    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
