import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const SERVER_URL = 'http://localhost:5000'; // Replace with your backend server URL  

export default apiClient;