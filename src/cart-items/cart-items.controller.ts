import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Cart Items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiBody({
    description: 'Example of cart item POST request',
    type: CreateCartItemDto,
    examples: {
      example1: {
        value: {
          cartId: 1,
          productId: 1,
          quantity: 2,
        },
        summary: 'Example of User POST request body',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The cart item has been successfully created.',
  })
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'Returns all cart items.' })
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the cart item with the specified ID.',
  })
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart Item ID' })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart Item ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
