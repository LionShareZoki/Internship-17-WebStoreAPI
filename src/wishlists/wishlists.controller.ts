import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wishlist' })
  @ApiBody({
    description: 'Example of Wishlist POST request',
    type: CreateWishlistDto,
    examples: {
      example1: {
        value: {
          id: 2,
          userId: 1,
        },
        summary: 'Example of Wishlist POST request body',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The wishlist has been successfully created.',
  })
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wishlists' })
  @ApiResponse({ status: 200, description: 'Returns all wishlists.' })
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the wishlist with the specified ID.',
  })
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiBody({ type: UpdateWishlistDto })
  @ApiResponse({
    status: 200,
    description: 'The wishlist has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiResponse({
    status: 200,
    description: 'The wishlist has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
