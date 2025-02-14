import { IsString, MinLength, MaxLength, IsIn, IsEmail } from 'class-validator';
import { UserRole } from '../user.schema';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName: string;

  @IsIn([UserRole])
  role: UserRole;
}
