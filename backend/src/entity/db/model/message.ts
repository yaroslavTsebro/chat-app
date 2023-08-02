import { model, ObjectId, Schema, Types } from 'mongoose';
import { IFile } from './file';
import { IUser } from './user';

export interface IMessage {
  _id: ObjectId;
  groupId: ObjectId;
  parentMessage?: ObjectId;
  sender: ObjectId;
  readBy: IUser[];
  deletedBy: IUser[];
  text: string;
  files: IFile[];
  createdAt: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    groupId: { type: Types.ObjectId, ref: 'Group' },
    sender: { type: Types.ObjectId, ref: 'User' },
    parentMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

export const Message = model<IMessage>('Message', messageSchema);
