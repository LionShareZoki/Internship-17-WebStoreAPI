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
import { WishlistItemsService } from './wishlist-items.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/users/user-auth.guard';

@ApiTags('wishlist-items')
@Controller('wishlist-items')
export class WishlistItemsController {
  constructor(private readonly wishlistItemsService: WishlistItemsService) {}
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
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

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all wishlist items' })
  findAll() {
    return this.wishlistItemsService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get specific wishlist item' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.wishlistItemsService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update specific wishlist item' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateWishlistItemDto: UpdateWishlistItemDto,
  ) {
    return this.wishlistItemsService.update(+id, updateWishlistItemDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific wishlist item' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.wishlistItemsService.remove(+id);
  }
}
