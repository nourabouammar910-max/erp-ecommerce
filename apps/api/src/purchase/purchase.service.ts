import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService,
  ) {}

  async create(dto: {
    supplierId: string;
    warehouseId: string;
    items: {
      productId: string;
      quantity: number;
      cost: number;
    }[];
  }) {
    let total = 0;

    for (const item of dto.items) {
      total += item.cost * item.quantity;
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        supplierId: dto.supplierId,
        total,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            cost: item.cost,
          })),
        },
      },
    });

    for (const item of dto.items) {
      await this.inventoryService.addStock({
        productId: item.productId,
        warehouseId: dto.warehouseId,
        quantity: item.quantity,
        reference: `purchase:${purchase.id}`,
      });
    }

    return purchase;
  }

  findAll() {
    return this.prisma.purchase.findMany({
      include: {
        items: true,
        supplier: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.purchase.findUnique({
      where: { id },
      include: {
        items: true,
        supplier: true,
      },
    });
  }
}