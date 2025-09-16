import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export const SERVER_URL = 'http://localhost:5000'; // Replace with your backend server URL  

export default apiClient;