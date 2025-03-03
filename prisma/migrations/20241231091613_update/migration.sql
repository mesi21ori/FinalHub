/*
  Warnings:

  - You are about to drop the column `preferences` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferences";

-- CreateTable
CREATE TABLE "_UserPreferences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserPreferences_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPreferences_B_index" ON "_UserPreferences"("B");

-- AddForeignKey
ALTER TABLE "_UserPreferences" ADD CONSTRAINT "_UserPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferences" ADD CONSTRAINT "_UserPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
