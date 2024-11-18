/*
  Warnings:

  - You are about to drop the column `description` on the `SubscriptionPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "description",
ADD COLUMN     "features" TEXT[];
