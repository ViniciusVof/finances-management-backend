import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';
import { getBalanceEntries, getBalanceForAccounts } from '../utils/getBalance';

class DashboardController {
  async getInfoDash(req: Request, res: Response, next: NextFunction) {
    const { userId, fullname } = req.body;
    const accounts = await prisma.accounts.findMany({
      where: {
        userId: userId,
      },
      include: {
        typeAccount: true,
        Entries: true,
      },
    });
    const formattedAccounts = accounts.map(account => {
      return {
        bankAccount: account.bankAccount,
        typeAccount: account.typeAccount.title,
        amountBalance: getBalanceEntries(
          account.Entries,
          Number(account.initialBalance)
        ),
      };
    });
    const result = {
      user: {
        fullname,
      },
      accounts: formattedAccounts,
      amountBalance: getBalanceForAccounts(formattedAccounts),
    };
    res.status(StatusCodes.OK).json(result);
  }
}

export default new DashboardController();
