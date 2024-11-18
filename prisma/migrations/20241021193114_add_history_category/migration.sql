/*
  Warnings:

  - Added the required column `category` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HistoryCategory" AS ENUM ('MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "category" "HistoryCategory" ;
