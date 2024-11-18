/*
  Warnings:

  - You are about to drop the `UserCommentReaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCommentReaction" DROP CONSTRAINT "UserCommentReaction_commentId_fkey";

-- DropForeignKey
ALTER TABLE "UserCommentReaction" DROP CONSTRAINT "UserCommentReaction_userId_fkey";

-- DropTable
DROP TABLE "UserCommentReaction";

-- DropEnum
DROP TYPE "ReactionType";
