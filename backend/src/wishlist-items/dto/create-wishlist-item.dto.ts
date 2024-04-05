import { IsNumber } from 'class-validator';

export class CreateWishlistItemDto {
  @IsNumber()
  wishlistId: number;
  @IsNumber()
  productId: number;
}
