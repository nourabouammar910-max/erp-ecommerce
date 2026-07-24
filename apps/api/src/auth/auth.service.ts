import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


import {
  CreateUserDto,
  UserRole,
} from '../users/dto/create-user.dto';


import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';


import {
  UsersService
} from '../users/users.service';


import {
  LoginDto
} from './dto/login.dto';



@Injectable()
export class AuthService {



  constructor(

    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,

    private readonly config: ConfigService,

  ) {}





  async login(
    dto: LoginDto,
  ) {


    const user =
      await this.usersService.findByEmail(
        dto.email,
      );



    if (!user) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }



    const passwordMatch =
      await bcrypt.compare(
        dto.password,
        user.password,
      );



    if (!passwordMatch) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }



    const payload = {


      sub:user.id,


      email:user.email,


      role:user.role,


    };




    const accessToken =
      this.jwtService.sign(
        payload,
        {

          secret:
            this.config.getOrThrow<string>(
              'JWT_SECRET',
            ),

          expiresIn:'15m',

        },
      );





    const refreshToken =
      this.jwtService.sign(
        payload,
        {

          secret:
            this.config.getOrThrow<string>(
              'JWT_REFRESH_SECRET',
            ),

          expiresIn:'7d',

        },
      );






    return {


      access_token:
        accessToken,


      refresh_token:
        refreshToken,



      user:{


        id:user.id,


        name:user.name,


        email:user.email,


        role:user.role,


      },


    };


  }









  async register(
    dto:CreateUserDto,
  ){



    return this.usersService.create({



      name:
        dto.name,



      email:
        dto.email,



      password:
        dto.password,



      role:
        UserRole.USER,


    });



  }









  async refresh(
    token:string,
  ){


    try {


      const payload =
        this.jwtService.verify(
          token,
          {

            secret:
              this.config.getOrThrow<string>(
                'JWT_REFRESH_SECRET',
              ),

          },
        );





      const accessToken =
        this.jwtService.sign(
          {

            sub:
              payload.sub,


            email:
              payload.email,


            role:
              payload.role,


          },
          {


            secret:
              this.config.getOrThrow<string>(
                'JWT_SECRET',
              ),


            expiresIn:'15m',


          },
        );





      return {


        access_token:
          accessToken,


      };



    } catch {


      throw new UnauthorizedException(
        'Invalid refresh token',
      );


    }


  }



}