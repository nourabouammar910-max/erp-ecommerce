import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getStats() {
    const [
      users,
      products,
      suppliers,
      warehouses,
      orders,
      purchases,
      inventory,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.supplier.count(),
      this.prisma.warehouse.count(),
      this.prisma.order.count(),
      this.prisma.purchase.count(),
      this.prisma.stock.count(),
    ]);

    const sales = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    const purchaseTotal =
      await this.prisma.purchase.aggregate({
        _sum: {
          total: true,
        },
      });

    const inventoryValue =
      await this.prisma.stock.findMany({
        include: {
          product: true,
        },
      });

    const value =
      inventoryValue.reduce(
        (sum, stock) =>
          sum +
          stock.quantity *
            Number(stock.product.cost ?? 0),
        0,
      );

    return {
      users,
      products,
      suppliers,
      warehouses,
      orders,
      purchases,
      inventory,
      sales:
        sales._sum.total ?? 0,
      purchasesValue:
        purchaseTotal._sum.total ?? 0,
      inventoryValue: value,
    };
  }
}