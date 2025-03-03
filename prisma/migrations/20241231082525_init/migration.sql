-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('Weekly', 'Monthly', 'Yearly', 'Other');

-- CreateEnum
CREATE TYPE "PlanName" AS ENUM ('Heritage_Weekly', 'Chronicle_Monthly', 'Timekeepers_Yearly_Access', 'Free_Trial', 'Others');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLATFORM_ADMIN', 'PREMIUM_USER', 'PUBLIC_USER', 'RESEARCHER_USER', 'INSTITUTION_ADMIN', 'UPLOADER', 'REVIEWER');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'BOOK', 'ARTICLE', 'MUSIC', 'ARTIFACT');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('PRIVATE', 'PUBLIC', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WAR', 'POLITICS', 'RELIGION', 'CULTURE', 'FAMINE_CRISIS', 'CIVIL_RIGHTS', 'ECONOMY', 'DIPLOMACY', 'LEADERSHIP', 'ETHNIC_MOVMENTS');

-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('MUSEUM', 'CHURCH', 'LIBRARY', 'SCHOOL', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('HARASSMENT', 'HATE_SPEECH', 'SPAM', 'VIOLENCE', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "profilePicture" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" "GenderType",
    "dateOfBirth" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PUBLIC_USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPlatformAdmin" BOOLEAN NOT NULL DEFAULT false,
    "preferences" JSONB,
    "institutionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" SERIAL NOT NULL,
    "name" "PlanName" NOT NULL,
    "features" TEXT[],
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "validity" "DurationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freeTrial" BOOLEAN NOT NULL DEFAULT false,
    "trialDuration" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RequestStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "reviewerId" INTEGER,
    "researcherFile" TEXT,
    "reason" TEXT,

    CONSTRAINT "AccessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "website" TEXT,
    "emailDomain" TEXT,
    "collaborationPurpose" TEXT,
    "establishDate" TIMESTAMP(3) NOT NULL,
    "numberOfEmploy" INTEGER NOT NULL,
    "document" TEXT,
    "photo" TEXT,
    "type" "InstitutionType",
    "Phone" TEXT NOT NULL,
    "registrationStatus" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "fileUrl" TEXT,
    "accessLevel" "AccessLevel" NOT NULL,
    "uploaderId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "viewOnly" BOOLEAN NOT NULL DEFAULT true,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "eventType" "EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "bookDetailsId" INTEGER,
    "videoDetailsId" INTEGER,
    "musicDetailsId" INTEGER,
    "artifactDetailsId" INTEGER,
    "articleDetailsId" INTEGER,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalVideo" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "subtitles" TEXT[],
    "copyrightHolder" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publisher" TEXT NOT NULL,
    "director" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "producer" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cameraman" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cinematographer" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cast" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "eventDate" TIMESTAMP(3),
    "preservationStatus" TEXT,
    "source" TEXT,
    "ageRating" TEXT,
    "location" TEXT,
    "resolution" TEXT,
    "duration" TEXT,
    "relatedArticles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publicationDate" TEXT NOT NULL,
    "numberOfViews" INTEGER NOT NULL,
    "numberOfLikes" INTEGER NOT NULL,
    "numberOfComments" INTEGER NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalBook" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT,
    "ISBN" INTEGER NOT NULL,
    "language" TEXT,
    "author" TEXT,
    "coAuthors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "editor" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "numberOfPages" TEXT,
    "edition" TEXT,
    "bookType" TEXT,
    "series" BOOLEAN,
    "seriesNumber" TEXT,
    "publisher" TEXT,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "significance" TEXT,
    "historicalFigures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preservationStatus" TEXT,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "copyrightHolder" TEXT,
    "source" TEXT,
    "relatedArticles" TEXT[] DEFAULT ARRAY[]::TEXT[],
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
CREATE TABLE "HistoricalMusic" (
    "id" SERIAL NOT NULL,
    "alternativeTitle" TEXT,
    "language" TEXT NOT NULL,
    "duration" TEXT,
    "composer" TEXT,
    "musicProducer" TEXT,
    "musicType" TEXT,
    "singer" TEXT,
    "additionalSinger" TEXT[],
    "melodyAuthor" TEXT,
    "poemAuthor" TEXT,
    "instrument" TEXT[],
    "instrumentPlayer" TEXT[],
    "audioQuality" TEXT,
    "musicAlbum" TEXT,
    "musicNumber" TEXT,
    "recorder" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "historicalFigures" TEXT[],
    "location" TEXT,
    "significance" TEXT,
    "preservationStatus" TEXT,
    "source" TEXT,
    "publisher" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "copyrightHolder" TEXT,
    "relatedArticles" TEXT[] DEFAULT ARRAY[]::TEXT[],
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
    "format" TEXT,
    "resolution" TEXT,
    "aspectRatio" TEXT,
    "photoLocation" TEXT,
    "capturedDate" TIMESTAMP(3),
    "photographer" TEXT,
    "cameraMake" TEXT,
    "cameraModel" TEXT,
    "eventDate" TIMESTAMP(3),
    "historicalFigures" TEXT[],
    "significance" TEXT,
    "relatedArticles" TEXT[] DEFAULT ARRAY[]::TEXT[],
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
    "Source" TEXT,
    "relatedArticles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "numberOfViews" INTEGER,
    "numberOfLikes" INTEGER,
    "numberOfComments" INTEGER,
    "uploadedBy" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditBy" INTEGER,
    "lastEditDate" TIMESTAMP(3),

    CONSTRAINT "HistoricalArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "userNotified" BOOLEAN NOT NULL DEFAULT false,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "additionalDetails" TEXT,

    CONSTRAINT "CommentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_name_key" ON "Preference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_transactionId_key" ON "UserSubscription"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_registrationNumber_key" ON "Institution"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_adminId_key" ON "Institution"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_bookDetailsId_key" ON "Content"("bookDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_videoDetailsId_key" ON "Content"("videoDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_musicDetailsId_key" ON "Content"("musicDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_artifactDetailsId_key" ON "Content"("artifactDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_articleDetailsId_key" ON "Content"("articleDetailsId");

-- CreateIndex
CREATE INDEX "HistoricalVideo_uploadedBy_idx" ON "HistoricalVideo"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalBook_uploadedBy_idx" ON "HistoricalBook"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalMusic_uploadedBy_idx" ON "HistoricalMusic"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalPhoto_uploadedBy_idx" ON "HistoricalPhoto"("uploadedBy");

-- CreateIndex
CREATE INDEX "HistoricalArticle_uploadedBy_idx" ON "HistoricalArticle"("uploadedBy");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "HistoricalVideo" ADD CONSTRAINT "HistoricalVideo_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalVideo" ADD CONSTRAINT "HistoricalVideo_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalBook" ADD CONSTRAINT "HistoricalBook_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalBook" ADD CONSTRAINT "HistoricalBook_lastEditBy_fkey" FOREIGN KEY ("lastEditBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
