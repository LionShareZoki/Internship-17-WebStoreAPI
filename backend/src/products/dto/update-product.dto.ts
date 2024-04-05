import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;
  @IsString()
  description?: string;
  @IsNumber()
  price?: number;
  @IsNumber()
  stock?: number;
  @IsString()
  imageUrl?: string;
}
