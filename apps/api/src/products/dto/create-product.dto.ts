import {
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';


export class CreateProductDto {


  @IsString()
  name!: string;


  @IsString()
  sku!: string;


  @IsNumber()
  price!: number;


  @IsOptional()
  @IsNumber()
  cost?: number;


  @IsOptional()
  @IsNumber()
  categoryId?: number;


}