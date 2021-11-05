import { IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
