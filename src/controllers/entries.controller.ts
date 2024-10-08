import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

interface ITypeEntries {
  [key: string]: string;
}
interface IInverseTypeEntries {
  [key: string]: string;
}
class EntriesController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const typeEntries: ITypeEntries = {
      income: process.env.INCOME_ID || '5745c1c0-053e-4d51-941e-66c7c7bc24f3',
      expense: process.env.EXPENSE_ID || 'e657d9ae-b456-4e7c-a520-08f70a96de6f',
    };
    type TTypeEntrie = keyof typeof typeEntries;
    let type: TTypeEntrie = req.params.type;

    const entries = await prisma.entries.findMany({
      where: {
        userId: userId,
        typeId: typeEntries[type],
      },
      include: {
        type: true,
        accounts: true,
      },
    });
    const result = entries.map(entrie => {
      return {
        id: entrie.id,
        title: entrie.title,
        bankAccount: entrie.accounts?.bankAccount,
        amount: entrie.amount,
        type: entrie.type.id,
        realize: entrie.realize,
        categoriesId: entrie.categoriesId,
        accountsId: entrie.accountsId,
        subCategoriesId: entrie.subCategoriesId,
        dueDate: dayjs(entrie.dueDate).format('DD/MM/YYYY'),
      };
    });
    res.status(StatusCodes.OK).json(result);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      userId,
      accountsId,
      categoriesId,
      subCategoriesId,
      title,
      amount,
      realize,
      dueDate,
    } = req.body;
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
        categoriesId,
        subCategoriesId,
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
  async realizeEntries(req: Request, res: Response, next: NextFunction) {
    const { id, realize, dueDate } = req.body;
    const today = dayjs().format('DD/MM/YYYY');
    const entries = await prisma.entries.update({
      where: {
        id,
      },
      data: {
        realize,
        dueDate: realize
          ? dayjs(today, 'DD/MM/YYYY').format()
          : dayjs(dueDate, 'DD/MM/YYYY').format(),
      },
    });
    if (!entries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível alterar o status do lançamento',
      });
    }
    res.status(StatusCodes.OK).json(entries);
  }
  async updateEntries(req: Request, res: Response, next: NextFunction) {
    const {
      id,
      accountsId,
      categoriesId,
      subCategoriesId,
      title,
      amount,
      realize,
      dueDate,
    } = req.body;
    const today = dayjs().format('DD/MM/YYYY');
    const entries = await prisma.entries.update({
      where: {
        id,
      },
      data: {
        realize,
        accountsId,
        categoriesId,
        subCategoriesId,
        title,
        amount,
        dueDate: dayjs(dueDate, 'DD/MM/YYYY').format(),
      },
    });
    if (!entries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível atualizar o lançamento',
      });
    }
    res.status(StatusCodes.OK).json(entries);
  }

  async deleteEntries(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const deleteEntrie = await prisma.entries.delete({
      where: {
        id,
      },
    });

    if (!deleteEntrie) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível atualizar o lançamento',
      });
    }
    res.status(StatusCodes.OK).json({ message: 'Lançamento excluído' });
  }
}

export default new EntriesController();
