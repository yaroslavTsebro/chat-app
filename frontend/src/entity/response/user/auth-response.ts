import {User} from "../model/user";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}