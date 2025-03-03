/*
  Warnings:

  - You are about to drop the column `preservationStatus` on the `HistoricalMusic` table. All the data in the column will be lost.
  - The `melodyAuthor` column on the `HistoricalMusic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `poemAuthor` column on the `HistoricalMusic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "HistoricalMusic" DROP COLUMN "preservationStatus",
ALTER COLUMN "additionalSinger" SET DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "melodyAuthor",
ADD COLUMN     "melodyAuthor" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "poemAuthor",
ADD COLUMN     "poemAuthor" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "instrument" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "instrumentPlayer" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "eventDate" DROP NOT NULL,
ALTER COLUMN "historicalFigures" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "publicationDate" DROP NOT NULL;
