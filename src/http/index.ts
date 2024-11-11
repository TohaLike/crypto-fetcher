import { AuthResponse } from "@/models/response/AuthResponse";
import axios from "axios";

export const API_URL = `https://crypto-fetcher-back.onrender.com/api`

const axiosWithAuth = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

axiosWithAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return axiosWithAuth.request(originalRequest);
      }
    } catch (e) {
      console.log("Не авторизован");
    }
    throw error;
  }
);

export default axiosWithAuth;
