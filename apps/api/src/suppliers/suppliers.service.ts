import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@Injectable()
export class SuppliersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(dto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.supplier.findMany({
      include: {
        purchases: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  findOne(id: string) {
    return this.prisma.supplier.findUnique({
      where: {
        id,
      },
      include: {
        purchases: true,
      },
    });
  }

  update(
    id: string,
    dto: UpdateSupplierDto,
  ) {
    return this.prisma.supplier.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.supplier.delete({
      where: {
        id,
      },
    });
  }

}