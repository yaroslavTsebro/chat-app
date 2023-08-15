import axios from "axios";
import { config } from "../config/config";
import { AuthResponse } from "../entity/response/user/auth-response";

const BASE_URL = config.server.url;
export const TOKEN_NAME = "chat_accessToken";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$authHost.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_NAME)}`;
  return config;
});

$authHost.interceptors.response.use(
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
        const response = await axios.get<AuthResponse>(`${BASE_URL}/api/user/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem(TOKEN_NAME, response.data.accessToken);
        return $authHost.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  },
);

export { $host, $authHost };
