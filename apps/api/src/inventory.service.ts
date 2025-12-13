import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a single inventory item by ID or SKU
   */
  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  /**
   * Find multiple items with filters, sorting, and pagination.
   * Useful for the main Dashboard table.
   */
  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Add a new item to inventory
   */
  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  /**
   * Update an item (e.g. mark as SOLD, update Market Price)
   */
  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  /**
   * Delete an item from inventory
   */
  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
  
  /**
   * Custom Method: Bulk update market data (for your Python Workers)
   * This allows the scraper to update just the pricing fields safely.
   */
  async updateMarketData(
    id: string, 
    marketData: { lowestAsk: number; lastSale: number; highestBid: number }
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        lowestAsk: marketData.lowestAsk,
        lastSalePrice: marketData.lastSale,
        highestBid: marketData.highestBid,
        marketDataUpdated: new Date(), // Set timestamp automatically
      },
    });
  }
}