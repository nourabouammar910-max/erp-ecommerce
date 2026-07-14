import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';


@Injectable()
export class PurchaseService {

constructor(
 private readonly prisma: PrismaService,
){}



async create(dto:CreatePurchaseDto){


return this.prisma.$transaction(async(tx)=>{


let total = 0;


dto.items.forEach(item=>{

 total += item.quantity * item.cost;

});



const purchase =
await tx.purchase.create({

data:{


supplierId:dto.supplierId,

warehouseId:dto.warehouseId,

total,


items:{
create:
dto.items.map(item=>({

productId:item.productId,

quantity:item.quantity,

cost:item.cost

}))

}


},


include:{


supplier:true,

warehouse:true,

items:{
include:{
product:true
}
}


}



});





// =======================
// UPDATE STOCK
// =======================


for(const item of dto.items){



await tx.stock.upsert({


where:{


productId_warehouseId:{


productId:item.productId,

warehouseId:dto.warehouseId


}


},


update:{


quantity:{
increment:item.quantity
}


},


create:{


productId:item.productId,

warehouseId:dto.warehouseId,

quantity:item.quantity


}


});




// حركة المخزون

await tx.stockMovement.create({

data:{


productId:item.productId,

warehouseId:dto.warehouseId,

quantity:item.quantity,

type:"PURCHASE",

reference:purchase.id


}


});


}




return purchase;



});


}





// GET ALL

async findAll(){


return this.prisma.purchase.findMany({


include:{


supplier:true,

warehouse:true,


items:{
include:{
product:true
}
}


},


orderBy:{
createdAt:"desc"
}


});


}





// GET ONE

async findOne(id:string){


const purchase =
await this.prisma.purchase.findUnique({

where:{
id
},

include:{


supplier:true,

warehouse:true,


items:{
include:{
product:true
}
}


}

});



if(!purchase){

throw new NotFoundException(
"Purchase not found"
);

}



return purchase;


}






async remove(id:string){


await this.prisma.purchaseItem.deleteMany({

where:{
purchaseId:id
}

});



await this.prisma.purchase.delete({

where:{
id
}

});



return {
message:"Purchase deleted"
};


}



}