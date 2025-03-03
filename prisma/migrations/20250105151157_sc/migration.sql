/*
  Warnings:

  - You are about to drop the column `reason` on the `AccessRequest` table. All the data in the column will be lost.
  - You are about to drop the column `researcherFile` on the `AccessRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccessRequest" DROP COLUMN "reason",
DROP COLUMN "researcherFile",
ADD COLUMN     "proofOfIdentity" TEXT;
