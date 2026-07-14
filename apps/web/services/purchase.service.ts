import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePurchaseDto) {
    return this.prisma.$transaction(async (tx) => {
      
      const purchase = await tx.purchase.create({
        data: {
          supplierId: dto.supplierId,
          warehouseId: dto.warehouseId,
          total: dto.total,
        },
      });

      for (const item of dto.items) {
        // 1️⃣ تحديث المخزون (داخل transaction)
        await tx.stock.upsert({
          where: {
            productId_warehouseId: {
              productId: item.productId,
              warehouseId: dto.warehouseId,
            },
          },
          update: {
            quantity: { increment: item.quantity },
          },
          create: {
            productId: item.productId,
            warehouseId: dto.warehouseId,
            quantity: item.quantity,
          },
        });

        // 2️⃣ تسجيل الحركة
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            warehouseId: dto.warehouseId,
            type: 'PURCHASE',
            quantity: item.quantity,
            reference: `PURCHASE-${purchase.id}`,
          },
        });
      }

      return purchase;
    });
  }
}