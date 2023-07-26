import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { ValidationMessages } from '../../../constant/validation-messages';
import {UpdateUserDto} from "./update-user-dto";

export class CreateUserDto{
  @IsString({ message: ValidationMessages.EMAIL_MUST_BE_STRING })
  @MinLength(3, { message: ValidationMessages.EMAIL_IS_TOO_SHORT + 3 })
  @MaxLength(50, { message: ValidationMessages.EMAIL_IS_TOO_LONG + 50 })
  password: string;

  @IsString({ message: ValidationMessages.USERNAME_MUST_BE_STRING })
  @MinLength(2, { message: ValidationMessages.USERNAME_IS_TOO_SHORT + 2 })
  @MaxLength(50, { message: ValidationMessages.USERNAME_IS_TOO_LONG + 50 })
  username: string;

  @IsString({ message: ValidationMessages.PASSWORD_MUST_BE_STRING })
  @IsEmail({}, { message: ValidationMessages.EMAIL_MUST_BE_EMAIL })
  @MinLength(2, { message: ValidationMessages.PASSWORD_IS_TOO_SHORT + 2 })
  @MaxLength(50, { message: ValidationMessages.PASSWORD_IS_TOO_LONG + 50 })
  email: string;
}
