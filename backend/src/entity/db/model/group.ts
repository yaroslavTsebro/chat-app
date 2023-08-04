import { model, ObjectId, Schema, Types } from 'mongoose';
import { GroupTypeEnum } from './group-type-enum';

export interface IGroup {
  _id: ObjectId;
  members: ObjectId[];
  owner: ObjectId;
  name: string;
  avatars: ObjectId[];
  type: GroupTypeEnum;
  createdAt: Date;
  updatedAt?: Date;
}

const groupSchema = new Schema<IGroup>(
  {
    name: { type: String},
    members: [{ type: Types.ObjectId, ref: 'User'}],
    owner: { type: Types.ObjectId, ref: 'User' },
    avatars: [{ type: Types.ObjectId, ref: 'Avatar' }],
    type: {
      type: String,
      enum: Object.values(GroupTypeEnum),
      default: GroupTypeEnum.P2P,
    },
  },
  { timestamps: true }
);

export const Group = model<IGroup>('Group', groupSchema);
