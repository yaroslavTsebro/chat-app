import { model, ObjectId, Schema, Types } from 'mongoose';

export interface IGroupMember {
  _id: ObjectId;
  user: ObjectId;
  group: ObjectId;
  unreadMessages: ObjectId[];
  createdAt: Date;
  updatedAt?: Date;
}

const groupMemberSchema = new Schema<IGroupMember>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    group: { type: Types.ObjectId, ref: 'Group' },
    unreadMessages: [
      { type: Types.ObjectId, ref: 'Message', select: false },
    ],
  },
  { timestamps: true }
);

export const GroupMember = model<IGroupMember>(
  'GroupMember',
  groupMemberSchema
);
