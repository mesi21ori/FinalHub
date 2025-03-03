/*
  Warnings:

  - You are about to drop the column `numberOfComments` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDislikes` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLikes` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfViews` on the `HistoricalArticle` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfComments` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDislikes` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLikes` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfViews` on the `HistoricalBook` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfComments` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDislikes` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLikes` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfViews` on the `HistoricalMusic` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfComments` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDislikes` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLikes` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfViews` on the `HistoricalPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfComments` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDislikes` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLikes` on the `HistoricalVideo` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfViews` on the `HistoricalVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "numberOfComments" INTEGER DEFAULT 0,
ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfLikes" INTEGER DEFAULT 0,
ADD COLUMN     "numberOfViews" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "HistoricalArticle" DROP COLUMN "numberOfComments",
DROP COLUMN "numberOfDislikes",
DROP COLUMN "numberOfLikes",
DROP COLUMN "numberOfViews";

-- AlterTable
ALTER TABLE "HistoricalBook" DROP COLUMN "numberOfComments",
DROP COLUMN "numberOfDislikes",
DROP COLUMN "numberOfLikes",
DROP COLUMN "numberOfViews";

-- AlterTable
ALTER TABLE "HistoricalMusic" DROP COLUMN "numberOfComments",
DROP COLUMN "numberOfDislikes",
DROP COLUMN "numberOfLikes",
DROP COLUMN "numberOfViews";

-- AlterTable
ALTER TABLE "HistoricalPhoto" DROP COLUMN "numberOfComments",
DROP COLUMN "numberOfDislikes",
DROP COLUMN "numberOfLikes",
DROP COLUMN "numberOfViews";

-- AlterTable
ALTER TABLE "HistoricalVideo" DROP COLUMN "numberOfComments",
DROP COLUMN "numberOfDislikes",
DROP COLUMN "numberOfLikes",
DROP COLUMN "numberOfViews";
