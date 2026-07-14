import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';


export class CreateOrderItemDto {

  @IsString()
  productId!: string;


  @IsNumber()
  quantity!: number;


  @IsNumber()
  price!: number;

}



export class CreateOrderDto {


  @IsString()
  warehouseId!: string;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

}