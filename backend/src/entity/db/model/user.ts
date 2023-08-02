import { model, ObjectId, Schema, Types } from 'mongoose';
import { IAvatar } from './avatar';

export interface IUserDocument extends IUser, Document {}

export interface IUser {
  _id: ObjectId;
  avatars: IAvatar[];
  bio: string;
  online: boolean;
  lastSeen: Date;
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
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    bio: { type: String },
    online: { type: Boolean, default: false },
    lastSeen: { type: Date },
    avatars: [{ type: Types.ObjectId, ref: 'Avatar' }],
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
