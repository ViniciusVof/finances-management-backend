/*
  Warnings:

  - Added the required column `categoriesId` to the `Entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoriesId` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entries" ADD COLUMN     "categoriesId" TEXT NOT NULL,
ADD COLUMN     "subCategoriesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_subCategoriesId_fkey" FOREIGN KEY ("subCategoriesId") REFERENCES "SubCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
