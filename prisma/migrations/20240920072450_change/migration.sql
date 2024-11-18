/*
  Warnings:

  - The values [RESEARCHER,PREMIUM_USER,FREE] on the enum `AccessLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessLevel_new" AS ENUM ('PRIVATE', 'PUBLIC', 'RESTRICTED');
ALTER TABLE "Content" ALTER COLUMN "accessLevel" TYPE "AccessLevel_new" USING ("accessLevel"::text::"AccessLevel_new");
ALTER TYPE "AccessLevel" RENAME TO "AccessLevel_old";
ALTER TYPE "AccessLevel_new" RENAME TO "AccessLevel";
DROP TYPE "AccessLevel_old";
COMMIT;
