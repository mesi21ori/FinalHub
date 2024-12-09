/*
  Warnings:

  - You are about to drop the `_UserPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserPreferences" DROP CONSTRAINT "_UserPreferences_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserPreferences" DROP CONSTRAINT "_UserPreferences_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB;

-- DropTable
DROP TABLE "_UserPreferences";
