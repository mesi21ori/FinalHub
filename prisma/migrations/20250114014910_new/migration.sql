/*
  Warnings:

  - You are about to drop the column `city` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "email",
ADD COLUMN     "address" JSONB,
ADD COLUMN     "emailDomain" TEXT,
ADD COLUMN     "numberOfEmploy" INTEGER,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "website" TEXT;
