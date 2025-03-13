import axios from 'axios';
import { API_CONFIG } from "./config";

const apiClient = axios.create({
  baseURL: API_CONFIG.API_URL,
});

export default apiClient;