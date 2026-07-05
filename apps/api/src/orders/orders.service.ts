import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: any) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const productIds = dto.items.map((i) => i.productId);

        const products = await tx.product.findMany({
          where: { id: { in: productIds } },
        });

        const productMap = new Map(products.map((p) => [p.id, p]));

        let total = 0;

        const validatedItems: {
          productId: string;
          quantity: number;
          price: number;
        }[] = [];

        // 1️⃣ validation
        for (const item of dto.items) {
          const product = productMap.get(item.productId);

          if (!product) {
            throw new BadRequestException(
              `Product not found: ${item.productId}`,
            );
          }

          total += product.price * item.quantity;

          validatedItems.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          });
        }

        // 2️⃣ create order
        const order = await tx.order.create({
          data: {
            total,
            userId: dto.userId,
            items: {
              create: validatedItems.map((item) => ({
                quantity: item.quantity,
                price: item.price,
                product: {
                  connect: { id: item.productId },
                },
              })),
            },
          },
          include: {
            items: true,
          },
        });

        // 3️⃣ stock deduction (INSIDE transaction)
        for (const item of validatedItems) {
          const stock = await tx.stock.findUnique({
            where: {
              productId_warehouseId: {
                productId: item.productId,
                warehouseId: dto.warehouseId,
              },
            },
          });

          if (!stock || stock.quantity < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for product ${item.productId}`,
            );
          }

          await tx.stock.update({
            where: {
              productId_warehouseId: {
                productId: item.productId,
                warehouseId: dto.warehouseId,
              },
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: item.productId,
              warehouseId: dto.warehouseId,
              type: 'SALE',
              quantity: item.quantity,
              reference: String(order.id),
            },
          });
        }

        return order;
      });
    } catch (error) {
      console.error('========== ERROR ==========');
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}