/*
  Warnings:

  - The values [EARLY_HISTORY] on the enum `HistoryCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HistoryCategory_new" AS ENUM ('MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'ANCIENT_HISTORY', 'ECONOMIC_HISTORY', 'POLITICAL_HISTORY', 'ETHIOPIAN_REVOLUTION', 'ETHIOPIAN_NATIONALISM', 'ETHIOPIAN_LITERATURE');
ALTER TABLE "Content" ALTER COLUMN "category" TYPE "HistoryCategory_new" USING ("category"::text::"HistoryCategory_new");
ALTER TYPE "HistoryCategory" RENAME TO "HistoryCategory_old";
ALTER TYPE "HistoryCategory_new" RENAME TO "HistoryCategory";
DROP TYPE "HistoryCategory_old";
COMMIT;
