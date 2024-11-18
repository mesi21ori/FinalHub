-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('MUSEUM', 'CHURCH', 'LIBRARY', 'SCHOOL', 'OTHER');

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "photo" TEXT,
ADD COLUMN     "type" "InstitutionType";
