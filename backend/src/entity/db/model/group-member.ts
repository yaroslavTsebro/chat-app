import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IGroupMember {
  _id: ObjectId;
  user: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const groupMemberSchema = new Schema<IGroupMember>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const GroupMember = model<IGroupMember>(
  'GroupMember',
  groupMemberSchema
);
