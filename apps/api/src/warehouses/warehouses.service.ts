import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';


@Injectable()
export class WarehousesService {

  constructor(
    private prisma: PrismaService
  ){}


  create(dto: CreateWarehouseDto){

    return this.prisma.warehouse.create({
      data:dto
    });

  }



  findAll(){

    return this.prisma.warehouse.findMany({
      include:{
        stock:true,
        purchases:true
      }
    });

  }



  async findOne(id:string){

    const warehouse =
      await this.prisma.warehouse.findUnique({

        where:{id},

        include:{
          stock:{
            include:{
              product:true
            }
          }
        }

      });


    if(!warehouse){

      throw new NotFoundException(
        "Warehouse not found"
      );

    }


    return warehouse;

  }




  update(
    id:string,
    dto:UpdateWarehouseDto
  ){

    return this.prisma.warehouse.update({

      where:{id},

      data:dto

    });

  }




  remove(id:string){

    return this.prisma.warehouse.delete({

      where:{id}

    });

  }

}