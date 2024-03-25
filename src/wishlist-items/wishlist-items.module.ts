import { Module } from '@nestjs/common';
import { WishlistItemsService } from './wishlist-items.service';
import { WishlistItemsController } from './wishlist-items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WishlistItemsController],
  providers: [WishlistItemsService],
})
export class WishlistItemsModule {}
