import {
  Type
} from 'class-transformer';

import {
  ValidateNested,
  IsString,
  IsNumber,
  IsArray
} from 'class-validator';



export class CreatePurchaseItemDto {


  @IsString()
  productId!: string;



  @IsNumber()
  quantity!: number;



  @IsNumber()
  cost!: number;


}




export class CreatePurchaseDto {



  @IsString()
  supplierId!: string;



  @IsString()
  warehouseId!: string;




  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>CreatePurchaseItemDto)
  items!: CreatePurchaseItemDto[];



}