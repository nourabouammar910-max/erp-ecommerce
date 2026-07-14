import {
 Controller,
 Get,
 Post,
 Body,
 Param,
 Delete
} from '@nestjs/common';


import { PurchaseService } from './purchase.service';

import { CreatePurchaseDto } from './dto/create-purchase.dto';



@Controller('purchases')
export class PurchaseController {



constructor(
private readonly purchaseService:PurchaseService
){}



@Get()
findAll(){

return this.purchaseService.findAll();

}




@Post()
create(
@Body() dto:CreatePurchaseDto
){

return this.purchaseService.create(dto);

}



@Get(':id')
findOne(
@Param('id') id:string
){

return this.purchaseService.findOne(id);

}



@Delete(':id')
remove(
@Param('id') id:string
){

return this.purchaseService.remove(id);

}


}