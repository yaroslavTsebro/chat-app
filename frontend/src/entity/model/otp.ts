

export interface Otp {
  _id: string;
  user: string;
  code: string;
  createdAt: Date;
  updatedAt?: Date;
}
