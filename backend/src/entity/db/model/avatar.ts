import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IAvatar {
  _id: ObjectId;
  user: ObjectId;
  group: ObjectId;
  file: ObjectId;
  scale: number;
  x: number;
  y: number;
}

export const avatarSchema = new Schema<IAvatar>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: false },
    group: { type: Types.ObjectId, ref: 'Group', required: false },
    file: { type: Types.ObjectId, ref: 'File' },
    scale: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Avatar = model<IAvatar>('Avatar', avatarSchema);
