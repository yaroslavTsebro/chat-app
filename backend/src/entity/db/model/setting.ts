import { model, ObjectId, Schema, Types } from 'mongoose';
import { ThemeEnum } from './theme-enum';

export interface ISetting {
  _id: ObjectId;
  user: ObjectId;
  theme: ThemeEnum;
  enterToSend: boolean;
  mute: boolean;
  sortByContacts: boolean;
}

const settingsSchema = new Schema<ISetting>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    theme: {
      type: String,
      enum: Object.values(ThemeEnum),
      default: ThemeEnum.Light,
    },
    enterToSend: { type: Boolean, required: true, default: true },
    mute: { type: Boolean, required: true, default: false },
    sortByContacts: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const Avatar = model<ISetting>('Setting', settingsSchema);
