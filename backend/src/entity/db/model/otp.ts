import {model, ObjectId, Schema, Types} from 'mongoose';

export interface IOtp {
  _id: ObjectId;
  user: ObjectId;
  code: string;
  createdAt: Date;
  updatedAt?: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    code: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Otp = model<IOtp>('Otp', otpSchema);
