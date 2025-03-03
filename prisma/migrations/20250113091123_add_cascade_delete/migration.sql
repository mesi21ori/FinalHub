/*
  Warnings:

  - Added the required column `Goesto` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "Goesto" BOOLEAN NOT NULL;
