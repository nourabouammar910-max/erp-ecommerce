import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  // CREATE
  create(data: {
    name: string;
    sku?: string;
    price: number;
    cost?: number;
    categoryId?: number;
  }) {

    return this.prisma.product.create({

      data,

      include:{
        category:true,
      },

    });

  }



  // GET ALL
  findAll(){

    return this.prisma.product.findMany({

      include:{
        category:true,
      },

    });

  }



  // GET ONE
  findOne(id:string){

    return this.prisma.product.findUnique({

      where:{
        id,
      },

      include:{
        category:true,
      },

    });

  }



  // UPDATE
  update(
    id:string,
    data:{
      name?:string;
      sku?:string;
      price?:number;
      cost?:number;
      categoryId?:number;
    },
  ){

    return this.prisma.product.update({

      where:{
        id,
      },

      data,

      include:{
        category:true,
      },

    });

  }



  // DELETE
  remove(id:string){

    return this.prisma.product.delete({

      where:{
        id,
      },

    });

  }

}