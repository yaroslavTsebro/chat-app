import { JWTPayload } from "jose";

export interface UserJWTData extends JWTPayload {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  isVerified: boolean;
}
