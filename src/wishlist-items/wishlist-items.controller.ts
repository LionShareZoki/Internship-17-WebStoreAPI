import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistItemsService } from './wishlist-items.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('wishlist-items')
@Controller('wishlist-items')
export class WishlistItemsController {
  constructor(private readonly wishlistItemsService: WishlistItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wishlist item' })
  @ApiBody({
    description: 'Example of Wishlist Item POST request',
    type: CreateWishlistItemDto,
    examples: {
      example1: {
        value: {
          id: 2,
          wishlistId: 2,
          productId: 1,
        },
        summary: 'Example of Wishlist Item POST request body',
      },
    },
  })
  create(@Body() createWishlistItemDto: CreateWishlistItemDto) {
    return this.wishlistItemsService.create(createWishlistItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wishlist items' })
  findAll() {
    return this.wishlistItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific wishlist item' })
  findOne(@Param('id') id: string) {
    return this.wishlistItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific wishlist item' })
  update(
    @Param('id') id: string,
    @Body() updateWishlistItemDto: UpdateWishlistItemDto,
  ) {
    return this.wishlistItemsService.update(+id, updateWishlistItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific wishlist item' })
  remove(@Param('id') id: string) {
    return this.wishlistItemsService.remove(+id);
  }
}
