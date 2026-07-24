import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';


import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';


import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { RolesGuard } from '../common/guards/roles.guard';



@Controller('users')
export class UsersController {



  constructor(
    private readonly usersService: UsersService,
  ) {}





  // ========================
  // Create User
  // ========================

  @Post()

  @UseGuards(
    JwtAuthGuard,
  )

  create(
    @Body() createUserDto: CreateUserDto,
  ){

    return this.usersService.create(
      createUserDto,
    );

  }









  // ========================
  // Get All Users
  // Any Logged User
  // ========================

  @Get()

  @UseGuards(
    JwtAuthGuard,
  )

  findAll(){

    return this.usersService.findAll();

  }









  // ========================
  // Current Profile
  // ========================

  @Get('profile')

  @UseGuards(
    JwtAuthGuard,
  )

  profile(
    @Req() req:any,
  ){

    return req.user;

  }









  // ========================
  // Get User By ID
  // ========================

  @Get(':id')

  @UseGuards(
    JwtAuthGuard,
  )

  findOne(
    @Param('id') id:string,
  ){

    return this.usersService.findOne(
      +id,
    );

  }









  // ========================
  // Update User
  // ADMIN ONLY
  // ========================

  @Patch(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  update(

    @Param('id') id:string,

    @Body() updateUserDto:UpdateUserDto,

  ){

    return this.usersService.update(
      +id,
      updateUserDto,
    );

  }









  // ========================
  // Delete User
  // ADMIN ONLY
  // ========================

  @Delete(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  remove(
    @Param('id') id:string,
  ){

    return this.usersService.remove(
      +id,
    );

  }



}