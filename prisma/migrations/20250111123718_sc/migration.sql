/*
  Warnings:

  - You are about to drop the column `resolved` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "resolved",
ADD COLUMN     "rating" INTEGER NOT NULL;
