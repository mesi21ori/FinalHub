/*
  Warnings:

  - You are about to drop the column `category` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `publicationDate` on the `HistoricalVideo` table. All the data in the column will be lost.
  - The `director` column on the `HistoricalVideo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `producer` column on the `HistoricalVideo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cinematographer` column on the `HistoricalVideo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `eventType` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WAR', 'POLITICS', 'RELIGION', 'CULTURE', 'FAMINE_CRISIS', 'CIVIL_RIGHTS', 'ECONOMY', 'DIPLOMACY', 'LEADERSHIP', 'ETHNIC_MOVMENTS');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "category",
ADD COLUMN     "eventType" "EventType" NOT NULL;

-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "eventType",
DROP COLUMN "genre",
DROP COLUMN "publicationDate",
DROP COLUMN "director",
ADD COLUMN     "director" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "producer",
ADD COLUMN     "producer" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "cinematographer",
ADD COLUMN     "cinematographer" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropEnum
DROP TYPE "HistoryCategory";
