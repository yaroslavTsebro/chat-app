import { UpdateUser } from "./update-user";

export interface CreateUser extends UpdateUser {
  password: string;
}
