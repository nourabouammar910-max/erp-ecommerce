import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { InventoryService } from './inventory.service';



@Controller('inventory')
export class InventoryController {


  constructor(
    private readonly inventoryService: InventoryService
  ) {}





  // ======================================
  // GET ALL STOCK
  // ======================================

  @Get()
  getAll(){

    return this.inventoryService.getAllStock();

  }





  // ======================================
  // DASHBOARD
  // ======================================

  @Get('dashboard')
  dashboard(){

    return this.inventoryService.getDashboard();

  }





  // ======================================
  // MOVEMENTS
  // ======================================

  @Get('movements')
  movements(){

    return this.inventoryService.getMovements();

  }





  // ======================================
  // PRODUCTS
  // ======================================

  @Get('products')
  products(){

    return this.inventoryService.getProducts();

  }





  // ======================================
  // WAREHOUSES
  // ======================================

  @Get('warehouses')
  warehouses(){

    return this.inventoryService.getWarehouses();

  }





  // ======================================
  // ADD STOCK
  // ======================================

  @Post('add')
  add(
    @Body() body:any
  ){

    return this.inventoryService.addStock(body);

  }





  // ======================================
  // REMOVE STOCK
  // ======================================

  @Post('remove')
  remove(
    @Body() body:any
  ){

    return this.inventoryService.removeStock(body);

  }





  // ======================================
  // ADJUST STOCK
  // ======================================

  @Post('adjust')
  adjust(
    @Body() body:any
  ){

    return this.inventoryService.adjustStock(body);

  }


}