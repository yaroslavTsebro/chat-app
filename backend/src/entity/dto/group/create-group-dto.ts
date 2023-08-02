import { GroupTypeEnum } from "../../db/model/group-type-enum";
import { CreateAvatarDto } from "../avatar/create-avatar-dto";

export class CreateGroupDto{
  members: string[];
  name?: string;
  type: GroupTypeEnum;
  avatar?: CreateAvatarDto;
}