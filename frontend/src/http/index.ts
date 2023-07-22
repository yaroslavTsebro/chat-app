import axios from "axios";
import { config } from "../config/config";
import { AuthResponse } from "../entity/response/auth-response";

const BASE_URL = config.server.url;
const TOKEN_NAME = "refreshToken";

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_NAME)}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem(TOKEN_NAME, response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  },
);

export default api;
