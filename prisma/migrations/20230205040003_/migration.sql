-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_subCategoriesId_fkey";

-- AlterTable
ALTER TABLE "Entries" ALTER COLUMN "subCategoriesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_subCategoriesId_fkey" FOREIGN KEY ("subCategoriesId") REFERENCES "SubCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
