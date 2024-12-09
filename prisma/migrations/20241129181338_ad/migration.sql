-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserPreferences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_name_key" ON "Preference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPreferences_AB_unique" ON "_UserPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPreferences_B_index" ON "_UserPreferences"("B");

-- AddForeignKey
ALTER TABLE "_UserPreferences" ADD CONSTRAINT "_UserPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferences" ADD CONSTRAINT "_UserPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
