import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    return await this.prisma.orderItem.create({
      data: createOrderItemDto,
    });
  }

  async findAll() {
    return await this.prisma.orderItem.findMany({
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return await this.prisma.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
