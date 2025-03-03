/*
  Warnings:

  - You are about to drop the column `eventDate` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `historicalFigures` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `preservationStatus` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `relatedArticles` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `seriesNumber` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `significance` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `HistoricalBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HistoricalBook" DROP COLUMN "eventDate",
DROP COLUMN "historicalFigures",
DROP COLUMN "location",
DROP COLUMN "preservationStatus",
DROP COLUMN "relatedArticles",
DROP COLUMN "series",
DROP COLUMN "seriesNumber",
DROP COLUMN "significance",
DROP COLUMN "source",
ADD COLUMN     "significant" TEXT;
