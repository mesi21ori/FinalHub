/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,isActive]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserSubscription_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionId";

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_isActive_key" ON "UserSubscription"("userId", "isActive");
