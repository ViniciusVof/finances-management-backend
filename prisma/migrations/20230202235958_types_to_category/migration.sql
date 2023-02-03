/*
  Warnings:

  - Made the column `userId` on table `Entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountsId` on table `Entries` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_accountsId_fkey";

-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_userId_fkey";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "typeId" TEXT;

-- AlterTable
ALTER TABLE "Entries" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "accountsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeEntries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
