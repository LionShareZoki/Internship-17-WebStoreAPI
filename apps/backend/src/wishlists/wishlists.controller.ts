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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserAuthGuard } from 'src/users/user-auth.guard';

@ApiTags('Wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
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

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all wishlists' })
  @ApiResponse({ status: 200, description: 'Returns all wishlists.' })
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the wishlist with the specified ID.',
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiBody({ type: UpdateWishlistDto })
  @ApiResponse({
    status: 200,
    description: 'The wishlist has been successfully updated.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wishlist by ID' })
  @ApiParam({ name: 'id', description: 'Wishlist ID' })
  @ApiResponse({
    status: 200,
    description: 'The wishlist has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.wishlistsService.remove(+id);
  }
}
