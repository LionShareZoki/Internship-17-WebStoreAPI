import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartItemDto) {
    return await this.prisma.cartItem.create({
      data: createCartItemDto,
    });
  }

  async findAll() {
    return await this.prisma.cartItem.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.cartItem.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return await this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.cartItem.delete({
      where: { id },
    });
  }
}
