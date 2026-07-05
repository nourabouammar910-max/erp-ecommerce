import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // ➕ Create Product
  create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: number;
  }) {
    return this.prisma.product.create({
      data,
      include: {
        category: true,
      },
    });
  }

  // 📥 Get all products
  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  // 📥 Get one product
  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  // ✏️ Update product
  update(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: number;
    },
  ) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  // ❌ Delete product
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}