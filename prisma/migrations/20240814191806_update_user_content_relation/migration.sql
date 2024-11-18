/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fname" DROP NOT NULL;
