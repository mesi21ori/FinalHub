-- AlterTable
ALTER TABLE "HistoricalArticle" ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "numberOfViews" SET DEFAULT 0,
ALTER COLUMN "numberOfLikes" SET DEFAULT 0,
ALTER COLUMN "numberOfComments" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "HistoricalBook" ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "numberOfViews" SET DEFAULT 0,
ALTER COLUMN "numberOfLikes" SET DEFAULT 0,
ALTER COLUMN "numberOfComments" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "HistoricalMusic" ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "numberOfViews" SET DEFAULT 0,
ALTER COLUMN "numberOfLikes" SET DEFAULT 0,
ALTER COLUMN "numberOfComments" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "HistoricalPhoto" ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "numberOfViews" SET DEFAULT 0,
ALTER COLUMN "numberOfLikes" SET DEFAULT 0,
ALTER COLUMN "numberOfComments" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "HistoricalVideo" ADD COLUMN     "numberOfDislikes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "numberOfViews" SET DEFAULT 0,
ALTER COLUMN "numberOfLikes" SET DEFAULT 0,
ALTER COLUMN "numberOfComments" SET DEFAULT 0;
