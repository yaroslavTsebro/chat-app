import { model, ObjectId, Schema, Types } from 'mongoose';
import { IAvatar } from './avatar';

export interface IProfile {
  _id: ObjectId;
  user: ObjectId;
  avatars: IAvatar[];
  username: string;
  bio: string;
  createdAt: Date;
  updatedAt?: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    bio: { type: String },
    avatars: [{ type: Types.ObjectId, ref: 'Avatar' }],
  },
  { timestamps: true }
);

export const Profile = model<IProfile>('Profile', profileSchema);
