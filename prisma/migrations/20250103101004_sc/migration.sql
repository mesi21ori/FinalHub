/*
  Warnings:

  - You are about to drop the column `lastEditBy` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditDate` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditBy` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditDate` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditBy` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditDate` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditBy` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditDate` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditBy` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `lastEditDate` on the `HistoricalVideo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoricalArticle" DROP CONSTRAINT "HistoricalArticle_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "HistoricalBook" DROP CONSTRAINT "HistoricalBook_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "HistoricalMusic" DROP CONSTRAINT "HistoricalMusic_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "HistoricalPhoto" DROP CONSTRAINT "HistoricalPhoto_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "HistoricalVideo" DROP CONSTRAINT "HistoricalVideo_lastEditBy_fkey";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "lastEditBy" INTEGER,
ADD COLUMN     "lastEditDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "HistoricalArticle" DROP COLUMN "lastEditBy",
DROP COLUMN "lastEditDate";

-- AlterTable
ALTER TABLE "HistoricalBook" DROP COLUMN "lastEditBy",
DROP COLUMN "lastEditDate";

-- AlterTable
ALTER TABLE "HistoricalMusic" DROP COLUMN "lastEditBy",
DROP COLUMN "lastEditDate";

-- AlterTable
ALTER TABLE "HistoricalPhoto" DROP COLUMN "lastEditBy",
DROP COLUMN "lastEditDate";

-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "lastEditBy",
DROP COLUMN "lastEditDate";

-- CreateTable
CREATE TABLE "_LastEditBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LastEditBy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LastEditBy_B_index" ON "_LastEditBy"("B");

-- AddForeignKey
ALTER TABLE "_LastEditBy" ADD CONSTRAINT "_LastEditBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LastEditBy" ADD CONSTRAINT "_LastEditBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
