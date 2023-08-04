import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IMessage {
  _id: ObjectId;
  groupId: ObjectId;
  parentMessage?: ObjectId;
  sender: ObjectId;
  readBy: ObjectId[];
  deletedBy: ObjectId[];
  text: string;
  files: ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    groupId: { type: Types.ObjectId, ref: 'Group' },
    sender: { type: Types.ObjectId, ref: 'User' },
    deletedBy: [{ type: Types.ObjectId, ref: 'User' }],
    readBy: [{ type: Types.ObjectId, ref: 'User' }],
    files: [{ type: Types.ObjectId, ref: 'File' }],
    parentMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

export const Message = model<IMessage>('Message', messageSchema);
