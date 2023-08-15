import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
import { CreateUser } from "../entity/request/user/create-user";
import { LoginUser } from "../entity/request/user/login-user";
import { AuthResponse } from "../entity/response/user/auth-response";
import { SuccessResponse } from "../entity/response/success-otp";
import { AppError } from "../entity/response/app-error";

type Response<T> = AppError | T;
type AuthResp = Response<AuthResponse>;
type SuccessResp = Response<SuccessResponse>;

export const registration = async (dto: CreateUser): Promise<AuthResp> => {
  const { data } = await $host.post("api/user/registration", {
    email: dto.email,
    password: dto.password,
    username: dto.username,
  });
  localStorage.setItem("chat_accessToken", data.token);
  return jwt_decode(data.token);
};

export const login = async (dto: LoginUser): Promise<AuthResp> => {
  const { data } = await $host.post("api/user/login", {
    email: dto.email,
    password: dto.password,
  });
  localStorage.setItem("chat_accessToken", data.token);
  return jwt_decode(data.token);
};

export const logout = async (): Promise<AuthResp> => {
  const { data } = await $authHost.get("api/user/logout");
  return data;
};

export const refresh = async (): Promise<AuthResp> => {
  const { data } = await $authHost.get("api/user/refresh");
  localStorage.setItem("chat_accessToken", data.token);
  return data;
};

export const sendOtp = async (): Promise<SuccessResp> => {
  const { data } = await $authHost.get("api/user/send-otp");
  return data;
};

export const activate = async (link: string): Promise<SuccessResp> => {
  const { data } = await $authHost.get(`api/user/activate/${link}`);
  return data;
};
