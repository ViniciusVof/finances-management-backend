-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_accountsId_fkey";

-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_userId_fkey";

-- AlterTable
ALTER TABLE "Entries" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "accountsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
