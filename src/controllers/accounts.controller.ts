import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class AccountsController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const accounts = await prisma.accounts.findMany({
      select: {
        bankAccount: true,
        initialBalance: true,
        typeAccount: {
          select: {
            title: true,
          },
        },
      },
    });
    res.status(StatusCodes.OK).json(accounts);
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
}

export default new AccountsController();
