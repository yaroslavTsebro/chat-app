import { Avatar } from "./avatar";

export interface Profile {
  _id: string;
  user: string;
  avatars: Avatar[];
  username: string;
  bio: string;
  createdAt: Date;
  updatedAt?: Date;
}
