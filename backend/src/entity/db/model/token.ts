import {model, ObjectId, Schema, Types} from 'mongoose';

export interface IToken {
  _id: ObjectId;
  token: string;
  user: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true, index: { unique: true } },
    user: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Token = model<IToken>('Token', tokenSchema);
