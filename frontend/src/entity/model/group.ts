import {Avatar} from "./avatar";
import {GroupTypeEnum} from "./group-type-enum";

export class Group {
  _id: string;
  roomId: string;
  members: string[];
  owner: string;
  name: string;
  avatars: Avatar[];
  type: GroupTypeEnum;
  createdAt: Date;
  updatedAt?: Date;
}
