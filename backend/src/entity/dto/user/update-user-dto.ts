import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";
import {ValidationMessages} from "../../../constant/validation-messages";

export class UpdateUserDto {
  @IsString({ message: ValidationMessages.USERNAME_MUST_BE_STRING })
  @MinLength(2, { message: ValidationMessages.USERNAME_IS_TOO_SHORT + 2 })
  @MaxLength(50, { message: ValidationMessages.USERNAME_IS_TOO_LONG + 50 })
  @IsOptional()
  username?: string;

  @IsString({ message: ValidationMessages.PASSWORD_MUST_BE_STRING })
  @IsEmail({}, { message: ValidationMessages.EMAIL_MUST_BE_EMAIL })
  @MinLength(2, { message: ValidationMessages.PASSWORD_IS_TOO_SHORT + 2 })
  @MaxLength(50, { message: ValidationMessages.PASSWORD_IS_TOO_LONG + 50 })
  @IsOptional()
  email?: string;
}