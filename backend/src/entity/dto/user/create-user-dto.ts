import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationMessages } from '../../../constant/validation-messages';
import {UpdateUserDto} from "./update-user-dto";

export class CreateUserDto extends UpdateUserDto{
  @IsString({ message: ValidationMessages.EMAIL_MUST_BE_STRING })
  @IsEmail({}, { message: ValidationMessages.EMAIL_MUST_BE_EMAIL })
  @MinLength(3, { message: ValidationMessages.EMAIL_IS_TOO_SHORT + 3 })
  @MaxLength(50, { message: ValidationMessages.EMAIL_IS_TOO_LONG + 50 })
  password: string;
}
