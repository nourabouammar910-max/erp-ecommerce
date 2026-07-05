import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // Find user by email (for auth)
  // =========================
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // =========================
  // Create user (REGISTER)
  // =========================
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // 🔥 مهم: لا ترجع password
    const { password, ...result } = user;
    return result;
  }

  // =========================
  // Get all users
  // =========================
  async findAll() {
    const users = await this.prisma.user.findMany();

    // 🔥 إزالة password من كل users
    return users.map(({ password, ...user }) => user);
  }

  // =========================
  // Get user by id
  // =========================
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { password, ...result } = user;
    return result;
  }

  // =========================
  // Update user
  // =========================
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...result } = user;
    return result;
  }

  // =========================
  // Delete user
  // =========================
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}