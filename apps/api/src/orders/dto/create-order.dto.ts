import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';

class OrderItemDto {
  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @Type(() => Number)
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}