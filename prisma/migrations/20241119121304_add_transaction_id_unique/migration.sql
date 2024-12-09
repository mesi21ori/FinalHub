/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transactionId` on table `UserSubscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserSubscription" ALTER COLUMN "transactionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_transactionId_key" ON "UserSubscription"("transactionId");
