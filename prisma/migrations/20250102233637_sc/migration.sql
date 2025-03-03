/*
  Warnings:

  - Added the required column `historicalContentRequested` to the `AccessRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intendedUse` to the `AccessRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purposeOfResearch` to the `AccessRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `researchTopic` to the `AccessRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessRequest" ADD COLUMN     "historicalContentRequested" TEXT NOT NULL,
ADD COLUMN     "institutionName" TEXT,
ADD COLUMN     "intendedUse" TEXT NOT NULL,
ADD COLUMN     "positionTitle" TEXT,
ADD COLUMN     "proofOfAffiliation" TEXT,
ADD COLUMN     "purposeOfResearch" TEXT NOT NULL,
ADD COLUMN     "researchTopic" TEXT NOT NULL,
ADD COLUMN     "researcherType" TEXT,
ADD COLUMN     "roleExplanation" TEXT,
ADD COLUMN     "supportingDocuments" TEXT;
