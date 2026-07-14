import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';


@Controller('products')
export class ProductsController {


  constructor(
    private readonly productsService: ProductsService,
  ) {}



  // =========================
  // Get all products
  // USER + ADMIN
  // =========================

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {

    return this.productsService.findAll();

  }




  // =========================
  // Create product
  // ADMIN ONLY
  // =========================

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  create(
    @Body() dto: CreateProductDto,
  ) {

    return this.productsService.create(dto);

  }




  // =========================
  // Get product by id
  // USER + ADMIN
  // =========================

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: string,
  ) {

    return this.productsService.findOne(id);

  }




  // =========================
  // Update product
  // ADMIN ONLY
  // =========================

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {

    return this.productsService.update(
      id,
      dto,
    );

  }




  // =========================
  // Delete product
  // ADMIN ONLY
  // =========================

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  remove(
    @Param('id') id: string,
  ) {

    return this.productsService.remove(id);

  }


}