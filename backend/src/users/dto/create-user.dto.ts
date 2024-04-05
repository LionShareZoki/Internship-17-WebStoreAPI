import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  isAdmin: boolean;
}
