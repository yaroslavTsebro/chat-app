import { Avatar } from "./avatar";

export class Profile {
  _id: string;
  user: string;
  avatars: Avatar[];
  username: string;
  bio: string;
  lastSeen: Date;
  createdAt: Date;
  updatedAt?: Date;
}
