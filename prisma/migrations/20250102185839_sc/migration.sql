-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "reviwerId" INTEGER;

-- AlterTable
ALTER TABLE "HistoricalArticle" ADD COLUMN     "reviwerBy" INTEGER;

-- AlterTable
ALTER TABLE "HistoricalBook" ADD COLUMN     "reviwerBy" INTEGER;

-- AlterTable
ALTER TABLE "HistoricalMusic" ADD COLUMN     "reviwerBy" INTEGER;

-- AlterTable
ALTER TABLE "HistoricalPhoto" ADD COLUMN     "reviwerBy" INTEGER;

-- AlterTable
ALTER TABLE "HistoricalVideo" ADD COLUMN     "reviwerBy" INTEGER;

-- CreateTable
CREATE TABLE "_VideoReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VideoReviewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookReviewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MusicReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MusicReviewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PhotoReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PhotoReviewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticleReviewer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArticleReviewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VideoReviewer_B_index" ON "_VideoReviewer"("B");

-- CreateIndex
CREATE INDEX "_BookReviewer_B_index" ON "_BookReviewer"("B");

-- CreateIndex
CREATE INDEX "_MusicReviewer_B_index" ON "_MusicReviewer"("B");

-- CreateIndex
CREATE INDEX "_PhotoReviewer_B_index" ON "_PhotoReviewer"("B");

-- CreateIndex
CREATE INDEX "_ArticleReviewer_B_index" ON "_ArticleReviewer"("B");

-- CreateIndex
CREATE INDEX "HistoricalArticle_reviwerBy_idx" ON "HistoricalArticle"("reviwerBy");

-- CreateIndex
CREATE INDEX "HistoricalBook_reviwerBy_idx" ON "HistoricalBook"("reviwerBy");

-- CreateIndex
CREATE INDEX "HistoricalMusic_reviwerBy_idx" ON "HistoricalMusic"("reviwerBy");

-- CreateIndex
CREATE INDEX "HistoricalPhoto_reviwerBy_idx" ON "HistoricalPhoto"("reviwerBy");

-- CreateIndex
CREATE INDEX "HistoricalVideo_reviwerBy_idx" ON "HistoricalVideo"("reviwerBy");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_reviwerId_fkey" FOREIGN KEY ("reviwerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalVideo" ADD CONSTRAINT "HistoricalVideo_reviwerBy_fkey" FOREIGN KEY ("reviwerBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalBook" ADD CONSTRAINT "HistoricalBook_reviwerBy_fkey" FOREIGN KEY ("reviwerBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalMusic" ADD CONSTRAINT "HistoricalMusic_reviwerBy_fkey" FOREIGN KEY ("reviwerBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalPhoto" ADD CONSTRAINT "HistoricalPhoto_reviwerBy_fkey" FOREIGN KEY ("reviwerBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalArticle" ADD CONSTRAINT "HistoricalArticle_reviwerBy_fkey" FOREIGN KEY ("reviwerBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoReviewer" ADD CONSTRAINT "_VideoReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoricalVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoReviewer" ADD CONSTRAINT "_VideoReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookReviewer" ADD CONSTRAINT "_BookReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoricalBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookReviewer" ADD CONSTRAINT "_BookReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicReviewer" ADD CONSTRAINT "_MusicReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoricalMusic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicReviewer" ADD CONSTRAINT "_MusicReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoReviewer" ADD CONSTRAINT "_PhotoReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoricalPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoReviewer" ADD CONSTRAINT "_PhotoReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleReviewer" ADD CONSTRAINT "_ArticleReviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoricalArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleReviewer" ADD CONSTRAINT "_ArticleReviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
