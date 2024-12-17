/*
  Warnings:

  - You are about to drop the column `coverImage` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `HistoricalVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "HistoricalArticle" DROP COLUMN "coverImage";

-- AlterTable
ALTER TABLE "HistoricalBook" DROP COLUMN "coverImage";

-- AlterTable
ALTER TABLE "HistoricalMusic" DROP COLUMN "coverImage";

-- AlterTable
ALTER TABLE "HistoricalPhoto" DROP COLUMN "coverImage";

-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "coverImage";
