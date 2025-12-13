import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Product, Status, Category, Condition, Prisma } from '@prisma/client';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  /**
   * GET /inventory/:id
   * Fetch a single item by its UUID
   */
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return this.inventoryService.product({ id });
  }

  /**
   * GET /inventory
   * Fetch all items (Dashboard Feed)
   * Optional: ?status=SOLD to filter by status
   */
  @Get()
  async getInventory(@Query('status') status?: Status): Promise<Product[]> {
    return this.inventoryService.products({
      where: status ? { status: status } : undefined,
      orderBy: { dateAdded: 'desc' }, // Show newest items first
    });
  }

  /**
   * GET /inventory/search/:searchString
   * Search by Name, Brand, SKU, or Model
   */
  @Get('search/:searchString')
  async searchInventory(
    @Param('searchString') searchString: string,
  ): Promise<Product[]> {
    return this.inventoryService.products({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { brand: { contains: searchString, mode: 'insensitive' } },
          { sku: { contains: searchString, mode: 'insensitive' } },
          { model: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }

  /**
   * POST /inventory
   * Create a new inventory item
   */
  @Post()
  async createProduct(
    @Body()
    postData: {
      name: string;
      brand?: string;
      sku?: string;
      size?: string;
      category: Category;
      condition: Condition;
      purchasePrice?: number;
      notes?: string;
    },
  ): Promise<Product> {
    const {
      name,
      brand,
      sku,
      size,
      category,
      condition,
      purchasePrice,
      notes,
    } = postData;

    return this.inventoryService.createProduct({
      name,
      brand,
      sku,
      size,
      category,
      condition,
      notes,
      purchasePrice: purchasePrice ? new Prisma.Decimal(purchasePrice) : null,
      status: 'UNLISTED',
    });
  }

  /**
   * PUT /inventory/:id
   * General update (e.g. changing status to SOLD, or updating notes)
   */
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    data: {
      status?: Status;
      listedPrice?: number;
      notes?: string;
    },
  ): Promise<Product> {
    return this.inventoryService.updateProduct({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
        listedPrice: data.listedPrice
          ? new Prisma.Decimal(data.listedPrice)
          : undefined,
      },
    });
  }

  /**
   * PUT /inventory/:id/market-data
   * Specific endpoint for Python Workers to update market prices
   */
  @Put(':id/market-data')
  async updateMarketData(
    @Param('id') id: string,
    @Body()
    marketData: {
      lowestAsk: number;
      lastSale: number;
      highestBid: number;
    },
  ): Promise<Product> {
    return this.inventoryService.updateMarketData(id, marketData);
  }

  /**
   * DELETE /inventory/:id
   * Delete an item permanently
   */
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.inventoryService.deleteProduct({ id });
  }
}