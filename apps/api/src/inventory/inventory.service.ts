import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockMovementType } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // =====================
  // REMOVE STOCK (SALE)
  // =====================
  async removeStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reference?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({
        where: {
          productId_warehouseId: {
            productId: data.productId,
            warehouseId: data.warehouseId,
          },
        },
      });

      if (!stock || stock.quantity < data.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      await tx.stock.update({
        where: {
          productId_warehouseId: {
            productId: data.productId,
            warehouseId: data.warehouseId,
          },
        },
        data: {
          quantity: {
            decrement: data.quantity,
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: data.productId,
          warehouseId: data.warehouseId,
          type: StockMovementType.SALE,
          quantity: data.quantity,
          reference: data.reference,
        },
      });
    });
  }

  // =====================
  // ADD STOCK (PURCHASE)
  // =====================
  async addStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reference?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      await tx.stock.upsert({
        where: {
          productId_warehouseId: {
            productId: data.productId,
            warehouseId: data.warehouseId,
          },
        },
        update: {
          quantity: {
            increment: data.quantity,
          },
        },
        create: {
          productId: data.productId,
          warehouseId: data.warehouseId,
          quantity: data.quantity,
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: data.productId,
          warehouseId: data.warehouseId,
          type: StockMovementType.IN,
          quantity: data.quantity,
          reference: data.reference,
        },
      });
    });
  }
}