/*
  Warnings:

  - You are about to drop the column `cameramen` on the `HistoricalVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "cameramen",
ADD COLUMN     "cameraman" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "historicalFigures" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "cast" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "relatedArtifacts" SET DEFAULT ARRAY[]::TEXT[];
