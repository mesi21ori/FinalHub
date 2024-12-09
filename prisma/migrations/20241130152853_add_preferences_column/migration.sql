-- AlterTable
ALTER TABLE "_UserPreferences" ADD CONSTRAINT "_UserPreferences_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserPreferences_AB_unique";
