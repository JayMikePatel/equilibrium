-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SHOE', 'APPAREL', 'VINYL', 'SPORTS_CARD', 'OTHER');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNLISTED', 'LISTED', 'SOLD', 'PRINT_LABEL', 'SHIP', 'SHIPPED');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "sku" TEXT,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "size" TEXT,
    "category" "Category" NOT NULL,
    "condition" "Condition" NOT NULL,
    "notes" TEXT,
    "lastSalePrice" DECIMAL(10,2),
    "lowestAsk" DECIMAL(10,2),
    "highestBid" DECIMAL(10,2),
    "marketDataUpdated" TIMESTAMP(3),
    "listedPrice" DECIMAL(10,2),
    "purchasePrice" DECIMAL(10,2),
    "status" "Status" NOT NULL DEFAULT 'UNLISTED',
    "purchaseDate" TIMESTAMP(3),
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
