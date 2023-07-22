import {User} from "./user";

export interface Message {
  _id: string;
  groupId: string;
  parentMessage?: string;
  sender: string;
  readBy: User[];
  deletedBy: User[];
  sendAt: Date;
  text: string;
  files: File[];
  createdAt: Date;
  updatedAt?: Date;
}
