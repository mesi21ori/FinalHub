/*
  Warnings:

  - The `preferences` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferences",
ADD COLUMN     "preferences" JSONB;