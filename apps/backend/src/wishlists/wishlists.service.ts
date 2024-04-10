import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto) {
    return await this.prisma.wishlist.create({
      data: createWishlistDto,
    });
  }

  async findAll() {
    return await this.prisma.wishlist.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.wishlist.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return await this.prisma.wishlist.update({
      where: { id },
      data: updateWishlistDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.wishlist.delete({
      where: { id },
    });
  }
}
