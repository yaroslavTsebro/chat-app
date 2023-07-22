export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
