/*
  Warnings:

  - You are about to drop the column `abstract` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `ArticleContent` table. All the data in the column will be lost.
  - You are about to drop the column `wordCount` on the `ArticleContent` table. All the data in the column will be lost.
  - The `editor` column on the `ArticleContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `abstract` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `BookContent` table. All the data in the column will be lost.
  - You are about to drop the column `wordCount` on the `BookContent` table. All the data in the column will be lost.
  - The `subtitle` column on the `BookContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `editor` column on the `BookContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `additionalSingers` on the `MusicContent` table. All the data in the column will be lost.
  - You are about to drop the column `cameraman` on the `MusicContent` table. All the data in the column will be lost.
  - You are about to drop the column `musicDirector` on the `MusicContent` table. All the data in the column will be lost.
  - The `subtitle` column on the `MusicContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `instrument` column on the `MusicContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `instrumentPlayer` column on the `MusicContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `coActors` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the column `editor` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the column `mainActor` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the column `videoType` on the `VideoContent` table. All the data in the column will be lost.
  - You are about to drop the `ArtifactContent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `ArticleContent` table without a default value. This is not possible if the table is not empty.
  - Made the column `publisher` on table `ArticleContent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `BookContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfComments` to the `BookContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfLikes` to the `BookContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfViews` to the `BookContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `address` on the `Institution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `MusicContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfComments` to the `MusicContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfLikes` to the `MusicContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfViews` to the `MusicContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationDate` to the `MusicContent` table without a default value. This is not possible if the table is not empty.
  - Made the column `publisher` on table `MusicContent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `numberOfComments` to the `VideoContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfLikes` to the `VideoContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfViews` to the `VideoContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationDate` to the `VideoContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `VideoContent` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `VideoContent` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('FEMALE', 'MALE');

-- DropForeignKey
ALTER TABLE "ArtifactContent" DROP CONSTRAINT "ArtifactContent_lastEditBy_fkey";

-- DropForeignKey
ALTER TABLE "ArtifactContent" DROP CONSTRAINT "ArtifactContent_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_artifactDetailsId_fkey";

-- AlterTable
ALTER TABLE "ArticleContent" DROP COLUMN "abstract",
DROP COLUMN "content",
DROP COLUMN "genre",
DROP COLUMN "isPublished",
DROP COLUMN "keywords",
DROP COLUMN "subtitle",
DROP COLUMN "wordCount",
ADD COLUMN     "alternativeTitle" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "historicalFigures" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "numberOfComments" INTEGER,
ADD COLUMN     "numberOfLikes" INTEGER,
ADD COLUMN     "numberOfViews" INTEGER,
ADD COLUMN     "primarySource" BOOLEAN,
ADD COLUMN     "significance" TEXT,
DROP COLUMN "editor",
ADD COLUMN     "editor" TEXT[],
ALTER COLUMN "publisher" SET NOT NULL;

-- AlterTable
ALTER TABLE "BookContent" DROP COLUMN "abstract",
DROP COLUMN "content",
DROP COLUMN "genre",
DROP COLUMN "isPublished",
DROP COLUMN "keywords",
DROP COLUMN "language",
DROP COLUMN "wordCount",
ADD COLUMN     "alternativeTitle" TEXT,
ADD COLUMN     "bookType" TEXT,
ADD COLUMN     "copyrightHolder" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "edition" TEXT,
ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "historicalFigures" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "numberOfComments" INTEGER NOT NULL,
ADD COLUMN     "numberOfLikes" INTEGER NOT NULL,
ADD COLUMN     "numberOfPages" TEXT,
ADD COLUMN     "numberOfViews" INTEGER NOT NULL,
ADD COLUMN     "preservationStatus" TEXT,
ADD COLUMN     "primarySource" BOOLEAN,
ADD COLUMN     "series" TEXT,
ADD COLUMN     "seriesNumber" TEXT,
ADD COLUMN     "significance" TEXT,
DROP COLUMN "subtitle",
ADD COLUMN     "subtitle" TEXT[],
ALTER COLUMN "author" DROP NOT NULL,
DROP COLUMN "editor",
ADD COLUMN     "editor" TEXT[],
ALTER COLUMN "publicationDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "collaborationPurpose" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailDomain" TEXT,
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT,
DROP COLUMN "address",
ADD COLUMN     "address" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "MusicContent" DROP COLUMN "additionalSingers",
DROP COLUMN "cameraman",
DROP COLUMN "musicDirector",
ADD COLUMN     "additionalSinger" TEXT,
ADD COLUMN     "alternativeTitle" TEXT,
ADD COLUMN     "copyrightHolder" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "historicalFigures" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "numberOfComments" INTEGER NOT NULL,
ADD COLUMN     "numberOfLikes" INTEGER NOT NULL,
ADD COLUMN     "numberOfViews" INTEGER NOT NULL,
ADD COLUMN     "preservationStatus" TEXT,
ADD COLUMN     "primarySource" BOOLEAN,
ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "significance" TEXT,
DROP COLUMN "subtitle",
ADD COLUMN     "subtitle" TEXT[],
ALTER COLUMN "publisher" SET NOT NULL,
DROP COLUMN "instrument",
ADD COLUMN     "instrument" TEXT[],
DROP COLUMN "instrumentPlayer",
ADD COLUMN     "instrumentPlayer" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "DateOfBirth" TIMESTAMP(3),
ADD COLUMN     "Firstname" TEXT,
ADD COLUMN     "Gender" "GenderType",
ADD COLUMN     "Lastname" TEXT,
ADD COLUMN     "PhoneNumber" TEXT;

-- AlterTable
ALTER TABLE "VideoContent" DROP COLUMN "coActors",
DROP COLUMN "editor",
DROP COLUMN "mainActor",
DROP COLUMN "releaseDate",
DROP COLUMN "thumbnail",
DROP COLUMN "videoType",
ADD COLUMN     "ageRating" TEXT,
ADD COLUMN     "cameramen" TEXT[],
ADD COLUMN     "cast" TEXT[],
ADD COLUMN     "copyrightHolder" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "historicalFigures" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "numberOfComments" INTEGER NOT NULL,
ADD COLUMN     "numberOfLikes" INTEGER NOT NULL,
ADD COLUMN     "numberOfViews" INTEGER NOT NULL,
ADD COLUMN     "preservationStatus" TEXT,
ADD COLUMN     "primarySource" BOOLEAN,
ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL,
ADD COLUMN     "relatedArtifacts" TEXT[],
ADD COLUMN     "significance" TEXT,
ADD COLUMN     "subtitles" TEXT[],
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "ArtifactContent";

-- CreateTable
CREATE TABLE "PhotoContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "tags" TEXT[],
    "eventDate" TIMESTAMP(3),
    "photographer" TEXT,
    "photos" TEXT[],
    "imageUrl" TEXT NOT NULL,
    "format" TEXT,
    "photoLocation" TEXT,
    "capturedDate" TIMESTAMP(3),
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PhotoContent_uploadedBy_idx" ON "PhotoContent"("uploadedBy");

-- CreateIndex
CREATE INDEX "ArticleContent_uploadedBy_idx" ON "ArticleContent"("uploadedBy");

-- CreateIndex
CREATE INDEX "BookContent_uploadedBy_idx" ON "BookContent"("uploadedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_registrationNumber_key" ON "Institution"("registrationNumber");

-- CreateIndex
CREATE INDEX "MusicContent_uploadedBy_idx" ON "MusicContent"("uploadedBy");

-- CreateIndex
CREATE INDEX "VideoContent_uploadedBy_idx" ON "VideoContent"("uploadedBy");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_artifactDetailsId_fkey" FOREIGN KEY ("artifactDetailsId") REFERENCES "PhotoContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoContent" ADD CONSTRAINT "PhotoContent_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoContent" ADD CONSTRAINT "PhotoContent_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
