import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistItemsModule } from './wishlist-items/wishlist-items.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
    CartsModule,
    CartItemsModule,
    WishlistsModule,
    WishlistItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
