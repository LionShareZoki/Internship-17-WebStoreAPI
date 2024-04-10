import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  total?: number;
  @IsString()
  status?: string;
}
