import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsNumber()
  userId: number;
  @IsString()
  @IsOptional()
  title?: string;
}
