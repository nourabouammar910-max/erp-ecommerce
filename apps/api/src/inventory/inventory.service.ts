import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StockMovementType } from '@prisma/client';


@Injectable()
export class InventoryService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  // ======================================
  // GET ALL STOCK
  // ======================================

  async getAllStock() {

    return this.prisma.stock.findMany({

      include:{
        product:true,
        warehouse:true,
      },

      orderBy:{
        product:{
          name:'asc',
        },
      },

    });

  }





  // ======================================
  // GET MOVEMENTS
  // ======================================

  async getMovements(){

    return this.prisma.stockMovement.findMany({

      include:{
        product:true,
        warehouse:true,
      },

      orderBy:{
        createdAt:'desc',
      },

    });

  }





  // ======================================
  // DASHBOARD
  // ======================================

  async getDashboard(){

    const [

      totalProducts,

      totalWarehouses,

      totalStockRows,

      lowStock,

      stockSum

    ] = await this.prisma.$transaction([


      this.prisma.product.count(),


      this.prisma.warehouse.count(),


      this.prisma.stock.count(),


      this.prisma.stock.count({

        where:{
          quantity:{
            lte:10,
          },
        },

      }),


      this.prisma.stock.aggregate({

        _sum:{
          quantity:true,
        },

      }),


    ]);



    return {

      totalProducts,

      totalWarehouses,

      totalStockRows,

      lowStock,

      totalQuantity:
      stockSum._sum.quantity ?? 0,

    };

  }





  // ======================================
  // GET PRODUCTS
  // ======================================

 async getProducts() {

  return this.prisma.product.findMany({

   include: {
  stock: {
    include: {
      warehouse: true
    }
  }
}

        

  });

}





  // ======================================
  // GET WAREHOUSES
  // ======================================

  async getWarehouses(){

    return this.prisma.warehouse.findMany({

      select:{
        id:true,
        name:true,
      },

      orderBy:{
        name:"asc",
      },

    });

  }





  // ======================================
  // ADD STOCK
  // ======================================

  async addStock(data:{
    productId:string;
    warehouseId:string;
    quantity:number;
    reference?:string;
  }){


    return this.prisma.$transaction(async(tx)=>{


      const stock =
      await tx.stock.upsert({

        where:{
          productId_warehouseId:{
            productId:data.productId,
            warehouseId:data.warehouseId,
          },
        },


        update:{

          quantity:{
            increment:data.quantity,
          },

        },


        create:{

          productId:data.productId,

          warehouseId:data.warehouseId,

          quantity:data.quantity,

        },


      });



      await tx.stockMovement.create({

        data:{

          productId:data.productId,

          warehouseId:data.warehouseId,

          quantity:data.quantity,

          reference:
          data.reference ?? "PURCHASE",


          type:
          StockMovementType.IN,

        },

      });



      return stock;


    });


  }





  // ======================================
  // REMOVE STOCK
  // ======================================

  async removeStock(data:{
    productId:string;
    warehouseId:string;
    quantity:number;
    reference?:string;
  }){


    return this.prisma.$transaction(async(tx)=>{


      const stock =
      await tx.stock.findUnique({

        where:{
          productId_warehouseId:{
            productId:data.productId,
            warehouseId:data.warehouseId,
          },
        },

      });



      if(!stock){

        throw new BadRequestException(
          "Stock not found"
        );

      }



      if(stock.quantity < data.quantity){

        throw new BadRequestException(
          "Insufficient stock"
        );

      }



      const updated =
      await tx.stock.update({

        where:{
          productId_warehouseId:{
            productId:data.productId,
            warehouseId:data.warehouseId,
          },
        },


        data:{

          quantity:{
            decrement:data.quantity,
          },

        },

      });




      await tx.stockMovement.create({

        data:{

          productId:data.productId,

          warehouseId:data.warehouseId,

          quantity:data.quantity,

          reference:
          data.reference ?? "SALE",


          type:
          StockMovementType.OUT,

        },

      });



      return updated;


    });


  }





  // ======================================
  // ADJUST STOCK
  // ======================================

  async adjustStock(data:{
    productId:string;
    warehouseId:string;
    quantity:number;
    reference?:string;
  }){


    return this.prisma.$transaction(async(tx)=>{


      const stock =
      await tx.stock.findUnique({

        where:{
          productId_warehouseId:{
            productId:data.productId,
            warehouseId:data.warehouseId,
          },
        },

      });



      if(!stock){

        throw new BadRequestException(
          "Stock not found"
        );

      }



      const newQuantity =
      stock.quantity + data.quantity;



      if(newQuantity < 0){

        throw new BadRequestException(
          "Insufficient stock"
        );

      }




      const updated =
      await tx.stock.update({

        where:{
          productId_warehouseId:{
            productId:data.productId,
            warehouseId:data.warehouseId,
          },
        },


        data:{

          quantity:newQuantity,

        },

      });





      await tx.stockMovement.create({

        data:{

          productId:data.productId,

          warehouseId:data.warehouseId,

          quantity:data.quantity,

          reference:
          data.reference ?? "MANUAL_ADJUST",


          type:
          StockMovementType.ADJUST,

        },

      });





      return updated;


    });


  }



}