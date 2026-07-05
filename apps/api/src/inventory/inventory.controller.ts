import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('inventory')
export class InventoryController {

  // ======================
  // GET STOCK (ADMIN ONLY)
  // ======================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  getStock() {
    return {
      message: 'Inventory endpoint ready (connect service next)',
    };
  }

  // ======================
  // MANUAL ADJUST STOCK
  // ======================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('adjust')
  adjustStock(@Body() body: any) {
    return {
      message: 'Stock adjustment endpoint ready',
      data: body,
    };
  }
}