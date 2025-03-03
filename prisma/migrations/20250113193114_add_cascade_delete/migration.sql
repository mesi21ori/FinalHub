/*
  Warnings:

  - You are about to drop the column `address` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `emailDomain` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfEmploy` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Institution` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Institution_registrationNumber_key";

-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "address",
DROP COLUMN "emailDomain",
DROP COLUMN "numberOfEmploy",
DROP COLUMN "registrationNumber",
DROP COLUMN "website",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" TEXT;
