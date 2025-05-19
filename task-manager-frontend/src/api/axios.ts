import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Change if your backend URL is different

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
