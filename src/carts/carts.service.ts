import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    return await this.prisma.cart.create({
      data: createCartDto,
    });
  }

  async findAll() {
    return await this.prisma.cart.findMany({
      include: {
        user: true,
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.cart.findUnique({
      where: { id },
      include: {
        user: true,
        items: true,
      },
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    return await this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.cart.delete({
      where: { id },
    });
  }
}
