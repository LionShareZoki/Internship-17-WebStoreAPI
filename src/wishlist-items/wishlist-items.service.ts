import { Injectable } from '@nestjs/common';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistItemDto: CreateWishlistItemDto) {
    return await this.prisma.wishlistItem.create({
      data: createWishlistItemDto,
    });
  }

  async findAll() {
    return await this.prisma.wishlistItem.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.wishlistItem.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateWishlistItemDto: UpdateWishlistItemDto) {
    return await this.prisma.wishlistItem.update({
      where: { id },
      data: updateWishlistItemDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.wishlistItem.delete({
      where: { id },
    });
  }
}
