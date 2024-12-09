/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `metaData` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `ArticleContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhotoContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleContent" DROP CONSTRAINT "ArticleContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "ArticleContent" DROP CONSTRAINT "ArticleContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "BookContent" DROP CONSTRAINT "BookContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "BookContent" DROP CONSTRAINT "BookContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_articleDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_artifactDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_bookDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_musicDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_videoDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "MusicContent" DROP CONSTRAINT "MusicContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "MusicContent" DROP CONSTRAINT "MusicContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "PhotoContent" DROP CONSTRAINT "PhotoContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "PhotoContent" DROP CONSTRAINT "PhotoContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "VideoContent" DROP CONSTRAINT "VideoContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "VideoContent" DROP CONSTRAINT "VideoContent_uploadedBy_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "fileUrl",
DROP COLUMN "metaData";

-- DropTable
DROP TABLE "ArticleContent";

-- DropTable
DROP TABLE "BookContent";

-- DropTable
DROP TABLE "MusicContent";

-- DropTable
DROP TABLE "PhotoContent";

-- DropTable
DROP TABLE "VideoContent";

-- CreateTable
CREATE TABLE "HistoricalBook" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT,
    "coverImage" TEXT,
    "subtitle" TEXT[],
    "bookUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coAuthors" TEXT[],
    "editor" TEXT[],
    "numberOfPages" TEXT,
    "edition" TEXT,
    "bookType" TEXT,
    "series" TEXT,
    "seriesNumber" TEXT,
    "publisher" TEXT,
    "publicationDate" TIMESTAMP(3),
    "copyrightHolder" TEXT,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "eventType" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[],
    "preservationStatus" TEXT,
    "primarySource" BOOLEAN,
    "language" TEXT,
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalVideo" (
    "id" SERIAL NOT NULL,
    "publisher" TEXT NOT NULL,
    "copyrightHolder" TEXT,
    "language" TEXT NOT NULL,
    "subtitles" TEXT[],
    "videoUrl" TEXT,
    "duration" TEXT,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "preservationStatus" TEXT,
    "primarySource" BOOLEAN,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "eventType" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[],
    "director" TEXT,
    "producer" TEXT,
    "cameramen" TEXT[],
    "cinematographer" TEXT,
    "cast" TEXT[],
    "relatedArtifacts" TEXT[],
    "ageRating" TEXT,
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "coverImage" TEXT,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalMusic" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT,
    "coverImage" TEXT,
    "albumImage" TEXT,
    "subtitle" TEXT[],
    "composer" TEXT,
    "duration" TEXT,
    "musicProducer" TEXT,
    "musicType" TEXT,
    "singer" TEXT,
    "additionalSinger" TEXT[],
    "melodyAuthor" TEXT,
    "poemAuthor" TEXT,
    "instrument" TEXT[],
    "instrumentPlayer" TEXT[],
    "musicAlbum" TEXT,
    "musicNumber" TEXT,
    "recorder" TEXT,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "eventType" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[],
    "preservationStatus" TEXT,
    "primarySource" BOOLEAN,
    "publisher" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "copyrightHolder" TEXT,
    "language" TEXT NOT NULL,
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalMusic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalPhoto" (
    "id" SERIAL NOT NULL,
    "coverImage" TEXT,
    "tags" TEXT[],
    "eventDate" TIMESTAMP(3),
    "photographer" TEXT,
    "photos" TEXT[],
    "imageUrl" TEXT NOT NULL,
    "format" TEXT,
    "photoLocation" TEXT,
    "capturedDate" TIMESTAMP(3),
    "eventType" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[],
    "primarySource" BOOLEAN,
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricalPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalArticle" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT,
    "coverImage" TEXT,
    "language" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coAuthors" TEXT[],
    "editor" TEXT[],
    "publisher" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "eventType" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[],
    "primarySource" BOOLEAN,
    "numberOfViews" INTEGER,
    "numberOfLikes" INTEGER,
    "numberOfComments" INTEGER,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoricalBook_uploadedBy_idx" ON "HistoricalBook"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalVideo_uploadedBy_idx" ON "HistoricalVideo"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalMusic_uploadedBy_idx" ON "HistoricalMusic"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalPhoto_uploadedBy_idx" ON "HistoricalPhoto"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalArticle_uploadedBy_idx" ON "HistoricalArticle"("uploadedBy");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_bookDetailsId_fkey" FOREIGN KEY ("bookDetailsId") REFERENCES "HistoricalBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_videoDetailsId_fkey" FOREIGN KEY ("videoDetailsId") REFERENCES "HistoricalVideo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_musicDetailsId_fkey" FOREIGN KEY ("musicDetailsId") REFERENCES "HistoricalMusic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_artifactDetailsId_fkey" FOREIGN KEY ("artifactDetailsId") REFERENCES "HistoricalPhoto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_articleDetailsId_fkey" FOREIGN KEY ("articleDetailsId") REFERENCES "HistoricalArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalBook" ADD CONSTRAINT "HistoricalBook_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalBook" ADD CONSTRAINT "HistoricalBook_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalVideo" ADD CONSTRAINT "HistoricalVideo_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalVideo" ADD CONSTRAINT "HistoricalVideo_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalMusic" ADD CONSTRAINT "HistoricalMusic_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalMusic" ADD CONSTRAINT "HistoricalMusic_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalPhoto" ADD CONSTRAINT "HistoricalPhoto_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalPhoto" ADD CONSTRAINT "HistoricalPhoto_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalArticle" ADD CONSTRAINT "HistoricalArticle_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalArticle" ADD CONSTRAINT "HistoricalArticle_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
