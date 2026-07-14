import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';

import {
  StockMovementType,
} from '@prisma/client';


@Injectable()
export class OrdersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(
    userId: number,
    dto: CreateOrderDto,
  ) {


    return this.prisma.$transaction(
      async (tx) => {


        let total = 0;



        const orderItems = [];



        for (const item of dto.items) {



          // get product

          const product =
            await tx.product.findUnique({

              where:{
                id:item.productId,
              },

            });



          if(!product){

            throw new BadRequestException(
              'Product not found',
            );

          }




          // check stock

          const stock =
            await tx.stock.findUnique({

              where:{
                productId_warehouseId:{
                  productId:item.productId,
                  warehouseId:dto.warehouseId,
                },
              },

            });




          if(!stock){

            throw new BadRequestException(
              'Product not available in warehouse',
            );

          }





          if(
            stock.quantity < item.quantity
          ){

            throw new BadRequestException(
              `Not enough stock for ${product.name}`,
            );

          }




          const price =
            product.price;



          total +=
            price * item.quantity;



          orderItems.push({

            productId:
              item.productId,

            quantity:
              item.quantity,

            price,

          });




        }




        // create order


        const order =
          await tx.order.create({

            data:{


              userId,


              warehouseId:
                dto.warehouseId,


              total,



              items:{
                create:orderItems,
              },


            },



            include:{


              items:{
                include:{
                  product:true,
                },
              },


              warehouse:true,

              user:{
                select:{
                  id:true,
                  name:true,
                  email:true,
                  role:true,
                },
              },

            },


          });






        // decrease stock


        for(const item of orderItems){



          await tx.stock.update({


            where:{
              productId_warehouseId:{
                productId:item.productId,
                warehouseId:dto.warehouseId,
              },
            },


            data:{


              quantity:{
                decrement:item.quantity,
              },


            },


          });






          await tx.stockMovement.create({


            data:{


              productId:
                item.productId,


              warehouseId:
                dto.warehouseId,


              quantity:
                item.quantity,


              type:
                StockMovementType.SALE,


              reference:
                `ORDER-${order.id}`,

            },


          });



        }




        return order;



      },
    );


  }





  async findAll(){


    return this.prisma.order.findMany({


      include:{


        items:{

          include:{
            product:true,
          },

        },


        warehouse:true,


        user:{
          select:{
            id:true,
            name:true,
            email:true,
            role:true,
          },
        },


      },


      orderBy:{
        id:'desc',
      },


    });


  }






  async findOne(id:number){


    const order =
      await this.prisma.order.findUnique({


        where:{
          id,
        },


        include:{


          items:{
            include:{
              product:true,
            },
          },


          warehouse:true,


          user:{
            select:{
              id:true,
              name:true,
              email:true,
              role:true,
            },
          },


        },


      });




    if(!order){

      throw new BadRequestException(
        'Order not found',
      );

    }



    return order;


  }



}