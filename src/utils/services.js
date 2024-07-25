import { BASE_URL } from 'constant/paths';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create a context to manage loading state

const twService = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

twService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage or any other storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

twService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle logout
      const navigate = useNavigate();
      // Perform logout operation (e.g., clear tokens)
      // Redirect to login page
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default twService;
