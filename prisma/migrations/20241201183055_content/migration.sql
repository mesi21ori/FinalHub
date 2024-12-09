/*
  Warnings:

  - A unique constraint covering the columns `[bookDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[photoDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[textDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "bookDetailsId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "musicDetailsId" INTEGER,
ADD COLUMN     "photoDetailsId" INTEGER,
ADD COLUMN     "textDetailsId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "videoDetailsId" INTEGER,
ALTER COLUMN "fileUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BookContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "abstract" TEXT,
    "author" TEXT NOT NULL,
    "coAuthors" TEXT[],
    "editor" TEXT,
    "publisher" TEXT,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,
    "wordCount" INTEGER,
    "genre" TEXT,
    "keywords" TEXT[],
    "content" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "BookContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "director" TEXT,
    "producer" TEXT,
    "videoType" TEXT,
    "mainActor" TEXT,
    "coActors" TEXT[],
    "cinematographer" TEXT,
    "editor" TEXT,
    "language" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "VideoContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "albumImage" TEXT,
    "composer" TEXT,
    "musicProducer" TEXT,
    "musicType" TEXT,
    "singer" TEXT,
    "additionalSingers" TEXT[],
    "publisher" TEXT,
    "language" TEXT NOT NULL,
    "poemAuthor" TEXT,
    "melodyAuthor" TEXT,
    "musicDirector" TEXT,
    "instrument" TEXT,
    "instrumentPlayer" TEXT,
    "musicAlbum" TEXT,
    "musicNumber" TEXT,
    "cameraman" TEXT,
    "recorder" TEXT,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "MusicContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "photographer" TEXT,
    "cameraModel" TEXT,
    "photoLocation" TEXT,
    "dateTaken" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "PhotoContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "abstract" TEXT,
    "author" TEXT NOT NULL,
    "coAuthors" TEXT[],
    "editor" TEXT,
    "publisher" TEXT,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,
    "wordCount" INTEGER,
    "genre" TEXT,
    "keywords" TEXT[],
    "content" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_bookDetailsId_key" ON "Content"("bookDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_videoDetailsId_key" ON "Content"("videoDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_musicDetailsId_key" ON "Content"("musicDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_photoDetailsId_key" ON "Content"("photoDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_textDetailsId_key" ON "Content"("textDetailsId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_bookDetailsId_fkey" FOREIGN KEY ("bookDetailsId") REFERENCES "BookContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_videoDetailsId_fkey" FOREIGN KEY ("videoDetailsId") REFERENCES "VideoContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_musicDetailsId_fkey" FOREIGN KEY ("musicDetailsId") REFERENCES "MusicContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_photoDetailsId_fkey" FOREIGN KEY ("photoDetailsId") REFERENCES "PhotoContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_textDetailsId_fkey" FOREIGN KEY ("textDetailsId") REFERENCES "TextContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContent" ADD CONSTRAINT "BookContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContent" ADD CONSTRAINT "BookContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoContent" ADD CONSTRAINT "VideoContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoContent" ADD CONSTRAINT "VideoContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicContent" ADD CONSTRAINT "MusicContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicContent" ADD CONSTRAINT "MusicContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoContent" ADD CONSTRAINT "PhotoContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoContent" ADD CONSTRAINT "PhotoContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextContent" ADD CONSTRAINT "TextContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
