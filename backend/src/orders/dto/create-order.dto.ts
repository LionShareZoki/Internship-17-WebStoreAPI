import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  total: number;
  @IsString()
  status: string;
}
