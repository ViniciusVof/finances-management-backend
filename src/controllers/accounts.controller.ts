import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';
import { getBalanceEntries } from '../utils/getBalance';

class AccountsController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const accounts = await prisma.accounts.findMany({
      where: {
        userId: userId,
      },
      include: {
        typeAccount: true,
        Entries: true,
      },
    });
    const result = accounts.map(account => {
      return {
        id: account.id,
        initialBalance: account.initialBalance,
        bankAccount: account.bankAccount,
        typeAccount: account.typeAccount.title,
        typeAccountsId: account.typeAccount.id,
        fullBankAccount: `${account.bankAccount} (${account.typeAccount.title})`,
        amountBalance: getBalanceEntries(
          account.Entries,
          Number(account.initialBalance)
        ),
      };
    });
    res.status(StatusCodes.OK).json(result);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { userId, initialBalance, bankAccount, typeAccountsId } = req.body;
    const account = await prisma.accounts.create({
      data: {
        userId,
        initialBalance,
        bankAccount,
        typeAccountsId,
      },
    });
    if (!account) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar uma nova conta',
      });
    }
    res.status(StatusCodes.OK).json({
      id: account.id,
      bankAccount: account.bankAccount,
      typeAccountsId: account.typeAccountsId,
      initialBalance: account.initialBalance,
    });
  }

  async updateAccount(req: Request, res: Response, next: NextFunction) {
    const { id, bankAccount, typeAccountsId, initialBalance } = req.body;
    const account = await prisma.accounts.update({
      where: {
        id,
      },
      data: {
        initialBalance,
        bankAccount,
        typeAccountsId,
      },
    });
    if (!account) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível alterar a conta bancária',
      });
    }
    res.status(StatusCodes.OK).json(account);
  }

  async deleteAccounts(req: Request, res: Response, next: NextFunction) {
    const { id, accountsId } = req.params;
    const updateEntries = prisma.entries.updateMany({
      where: {
        accountsId: id,
      },
      data: {
        accountsId,
      },
    });
    const deleteAccount = prisma.accounts.delete({
      where: {
        id,
      },
    });

    const transaction = await prisma.$transaction([
      updateEntries,
      deleteAccount,
    ]);

    if (!transaction) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível deletar a conta',
      });
    }

    res.status(StatusCodes.OK).json({ message: 'Conta bancária excluída' });
  }
}

export default new AccountsController();
