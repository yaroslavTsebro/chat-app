import { JWTPayload } from "jose";

export interface UserJWTData extends JWTPayload {
  _id: string;
  email: string;
  isVerified: boolean;
}