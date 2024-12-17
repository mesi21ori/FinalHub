/*
  Warnings:

  - You are about to drop the column `primarySource` on the `HistoricalVideo` table. All the data in the column will be lost.
  - Added the required column `alternativeTitle` to the `HistoricalVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `HistoricalVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "primarySource",
ADD COLUMN     "alternativeTitle" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "resolution" TEXT,
ADD COLUMN     "source" TEXT;
