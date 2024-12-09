/*
  Warnings:

  - You are about to drop the column `bookUrl` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `HistoricalVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "HistoricalBook" DROP COLUMN "bookUrl";

-- AlterTable
ALTER TABLE "HistoricalPhoto" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "videoUrl";
