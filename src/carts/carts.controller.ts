import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiBody({
    description: 'Example of cart item POST request',
    type: CreateCartDto,
    examples: {
      example1: {
        value: {
          userId: 3,
        },
        summary: 'Example of User POST request body',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully created.',
  })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({ status: 200, description: 'Returns all carts.' })
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the cart with the specified ID.',
  })
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
