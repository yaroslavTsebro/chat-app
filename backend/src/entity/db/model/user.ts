import { model, ObjectId, Schema } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
