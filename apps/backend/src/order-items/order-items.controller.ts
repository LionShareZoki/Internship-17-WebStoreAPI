import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserAuthGuard } from 'src/users/user-auth.guard';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiBody({
    description: 'Example of order item POST request',
    type: CreateOrderItemDto,
    examples: {
      example1: {
        value: {
          orderId: 1,
          productId: 1,
          quantity: 2,
          price: 25.99,
        },
        summary: 'Example of User POST request body',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The order item has been successfully created.',
  })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'Returns all order items.' })
  findAll() {
    return this.orderItemsService.findAll();
  }
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the order item with the specified ID.',
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.orderItemsService.findOne(+id);
  }
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully updated.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.orderItemsService.remove(+id);
  }
}
