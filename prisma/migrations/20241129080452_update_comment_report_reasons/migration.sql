-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('HARASSMENT', 'HATE_SPEECH', 'SPAM', 'VIOLENCE', 'Other');

-- AlterTable
ALTER TABLE "CommentReport" ADD COLUMN     "additionalDetails" TEXT;
