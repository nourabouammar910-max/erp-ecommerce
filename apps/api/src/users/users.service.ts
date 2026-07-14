import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}


  // =========================
  // Find user by email
  // Used by Auth Login
  // =========================

async findByEmail(email:string){

  return this.prisma.user.findUnique({

    where:{
      email,
    },


    select:{

      id:true,

      name:true,

      email:true,

      password:true,

      role:true,

    },

  });

}



  // =========================
  // Create User
  // =========================

  async create(createUserDto:CreateUserDto) {


    try {


      const hashedPassword =
        await bcrypt.hash(
          createUserDto.password,
          10,
        );



      const user =
        await this.prisma.user.create({

          data:{


            name:
              createUserDto.name,


            email:
              createUserDto.email,


            password:
              hashedPassword,


            role:
              createUserDto.role ?? 'USER',

          },

        });



      const {
        password,
        ...result
      } = user;



      return result;



    } catch(error){


      if(

        error instanceof Prisma.PrismaClientKnownRequestError

        &&

        error.code === 'P2002'

      ){

        throw new ConflictException(
          'Email already exists'
        );

      }



      throw error;

    }

  }





  // =========================
  // Get All Users
  // =========================

  async findAll(){


    const users =
      await this.prisma.user.findMany();



    return users.map(
      ({
        password,
        ...user
      })=>user
    );


  }





  // =========================
  // Get One User
  // =========================

  async findOne(id:number){


    const user =
      await this.prisma.user.findUnique({

        where:{
          id,
        },

      });



    if(!user){

      throw new NotFoundException(
        'User not found'
      );

    }



    const {
      password,
      ...result
    } = user;



    return result;


  }





  // =========================
  // Update User
  // =========================

  async update(
    id:number,
    updateUserDto:UpdateUserDto,
  ){


    try{


      const user =
        await this.prisma.user.update({

          where:{
            id,
          },


          data:
            updateUserDto,

        });



      const {
        password,
        ...result
      } = user;



      return result;



    }catch(error){



      if(

        error instanceof Prisma.PrismaClientKnownRequestError

        &&

        error.code === 'P2025'

      ){

        throw new NotFoundException(
          'User not found'
        );

      }



      throw error;


    }


  }





  // =========================
  // Delete User
  // =========================

  async remove(id:number){


    try{


      return await this.prisma.user.delete({

        where:{
          id,
        },

      });



    }catch(error){



      if(

        error instanceof Prisma.PrismaClientKnownRequestError

        &&

        error.code === 'P2025'

      ){

        throw new NotFoundException(
          'User not found'
        );

      }



      throw error;


    }


  }



}