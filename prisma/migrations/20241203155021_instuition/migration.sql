/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `Institution` table. All the data in the column will be lost.
  - Added the required column `Phone` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishDate` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfEmploy` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
ADD COLUMN     "Phone" TEXT NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "establishDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "numberOfEmploy" INTEGER NOT NULL;
