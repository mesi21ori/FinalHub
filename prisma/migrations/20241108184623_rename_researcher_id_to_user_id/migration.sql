/*
  Warnings:

  - You are about to drop the column `researcherId` on the `AccessRequest` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AccessRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessRequest" DROP CONSTRAINT "AccessRequest_researcherId_fkey";

-- AlterTable
ALTER TABLE "AccessRequest" DROP COLUMN "researcherId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
