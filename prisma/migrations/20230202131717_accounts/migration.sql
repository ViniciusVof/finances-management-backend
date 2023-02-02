-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "initialBalance" DOUBLE PRECISION NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "typeAccountsId" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeAccounts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TypeAccounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_typeAccountsId_fkey" FOREIGN KEY ("typeAccountsId") REFERENCES "TypeAccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
