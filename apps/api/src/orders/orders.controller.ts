import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request()
    req: ExpressRequest & {
      user: {
        userId: number;
        email: string;
        role: string;
      };
    },
    @Body() dto: CreateOrderDto,
  ) {
    console.log('CREATE USER:', req.user);

    return this.ordersService.create(
      req.user.userId,
      dto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Request()
    req: ExpressRequest & {
      user: {
        userId: number;
        email: string;
        role: string;
      };
    },
  ) {
    console.log('GET USER:', req.user);

    return this.ordersService.findAll();
  }
}