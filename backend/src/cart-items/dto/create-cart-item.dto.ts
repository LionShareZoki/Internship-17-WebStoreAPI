import { IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  cartId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
}
