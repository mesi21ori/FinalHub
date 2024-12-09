/*
  Warnings:

  - You are about to drop the column `DateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "DateOfBirth",
DROP COLUMN "Firstname",
DROP COLUMN "Gender",
DROP COLUMN "Lastname",
DROP COLUMN "PhoneNumber",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" "GenderType",
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
