import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInWithSocialNetworkDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  idToken: string;
}
