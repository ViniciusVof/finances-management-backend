-- AlterTable
ALTER TABLE "Entries" ADD COLUMN     "recurrency" BOOLEAN,
ADD COLUMN     "recurrencyIndex" INTEGER,
ADD COLUMN     "recurrencyTimes" INTEGER;

-- CreateTable
CREATE TABLE "TypeRecurrencies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypeRecurrencies_pkey" PRIMARY KEY ("id")
);
