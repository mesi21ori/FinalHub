/*
  Warnings:

  - The values [TEXT,PHOTO] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `photoDetailsId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `textDetailsId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `PhotoContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextContent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[artifactDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleDetailsId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('VIDEO', 'BOOK', 'ARTICLE', 'MUSIC', 'ARTIFACT');
ALTER TABLE "Content" ALTER COLUMN "contentType" TYPE "ContentType_new" USING ("contentType"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "ContentType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_photoDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_textDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "PhotoContent" DROP CONSTRAINT "PhotoContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "PhotoContent" DROP CONSTRAINT "PhotoContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "TextContent" DROP CONSTRAINT "TextContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "TextContent" DROP CONSTRAINT "TextContent_uploadedBy_fkey";

-- DropIndex
DROP INDEX "Content_photoDetailsId_key";

-- DropIndex
DROP INDEX "Content_textDetailsId_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "photoDetailsId",
DROP COLUMN "textDetailsId",
ADD COLUMN     "articleDetailsId" INTEGER,
ADD COLUMN     "artifactDetailsId" INTEGER;

-- DropTable
DROP TABLE "PhotoContent";

-- DropTable
DROP TABLE "TextContent";

-- CreateTable
CREATE TABLE "ArtifactContent" (
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

    CONSTRAINT "ArtifactContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleContent" (
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

    CONSTRAINT "ArticleContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_artifactDetailsId_key" ON "Content"("artifactDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_articleDetailsId_key" ON "Content"("articleDetailsId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_artifactDetailsId_fkey" FOREIGN KEY ("artifactDetailsId") REFERENCES "ArtifactContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_articleDetailsId_fkey" FOREIGN KEY ("articleDetailsId") REFERENCES "ArticleContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtifactContent" ADD CONSTRAINT "ArtifactContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtifactContent" ADD CONSTRAINT "ArtifactContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleContent" ADD CONSTRAINT "ArticleContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleContent" ADD CONSTRAINT "ArticleContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
