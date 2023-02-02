import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';
class EntriesController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const entries = await prisma.entries.findMany({
      where: {
        userId: userId,
      },
      include: {
        type: true,
        Accounts: true,
      },
    });
    const result = entries.map(entrie => {
      return {
        id: entrie.id,
        title: entrie.title,
        bankAccount: entrie.Accounts?.bankAccount,
        amount: entrie.amount,
        type: entrie.type.id,
        realize: entrie.realize,
        dueDate: dayjs(entrie.dueDate).format('DD/MM/YYYY'),
      };
    });
    res.status(StatusCodes.OK).json(result);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { userId, accountsId, title, amount, realize, dueDate } = req.body;
    const typeEntries = {
      income: process.env.INCOME_ID || '5745c1c0-053e-4d51-941e-66c7c7bc24f3',
      expense: process.env.EXPENSE_ID || 'e657d9ae-b456-4e7c-a520-08f70a96de6f',
    };

    type TTypeEntrie = keyof typeof typeEntries;
    const type: TTypeEntrie = req.body.type;

    const entries = await prisma.entries.create({
      data: {
        userId,
        accountsId,
        title,
        amount,
        typeId: typeEntries[type],
        realize,
        dueDate: dayjs(dueDate, 'DD/MM/YYYY').format(),
      },
    });
    if (!entries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar esse lançamento',
      });
    }
    res.status(StatusCodes.OK).json(entries);
  }
}

export default new EntriesController();
