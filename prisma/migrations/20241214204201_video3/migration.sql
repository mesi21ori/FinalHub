/*
  Warnings:

  - Added the required column `publicationDate` to the `HistoricalVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricalVideo" ADD COLUMN     "publicationDate" TEXT NOT NULL;
