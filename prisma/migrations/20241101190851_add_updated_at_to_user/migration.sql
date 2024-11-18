-- /*
--   Warnings:

--   - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

-- */
-- -- AlterTable
-- ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
-- -- Add the new updatedAt column with a default value
-- ALTER TABLE "User" ADD COLUMN "updatedAt" TIMESTAMPTZ DEFAULT now() NOT NULL;

-- -- Optionally, update existing rows to set the current timestamp
-- UPDATE "User" SET "updatedAt" = now();


-- Add the new createdAt and updatedAt columns
ALTER TABLE "User"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now();

-- Optionally, update existing rows to set the current timestamp for updatedAt
UPDATE "User" SET "updatedAt" = now();
