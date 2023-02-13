import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class CategoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;
    const categories = await prisma.categories.findMany({
      where: {
        userId: userId,
      },
      include: {
        subcategories: true,
        type: true,
      },
    });
    res.status(StatusCodes.OK).json(categories);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, userId } = req.body;
    const typeEntries = {
      income: process.env.INCOME_ID || 'f3466313-b796-42ed-b65b-27edac534468',
      expense: process.env.EXPENSE_ID || 'c708a3e7-c05b-4645-8c49-6161fd1f88be',
    };

    type TTypeEntrie = keyof typeof typeEntries;
    const type: TTypeEntrie = req.body.type;

    const category = await prisma.categories.create({
      data: {
        title,
        userId,
        typeId: typeEntries[type],
      },
    });
    if (!category) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar uma nova categoria',
      });
    }
    res.status(StatusCodes.OK).json({
      id: category.id,
      title: category.title,
      typeId: category.typeId,
    });
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { id, title, userId } = req.body;
    const typeEntries = {
      income: process.env.INCOME_ID || 'f3466313-b796-42ed-b65b-27edac534468',
      expense: process.env.EXPENSE_ID || 'c708a3e7-c05b-4645-8c49-6161fd1f88be',
    };

    type TTypeEntrie = keyof typeof typeEntries;
    const type: TTypeEntrie = req.body.type;

    const category = await prisma.categories.update({
      where: {
        id,
      },
      data: {
        title,
        userId,
        typeId: typeEntries[type],
      },
    });
    const updateEntries = await prisma.entries.updateMany({
      where: {
        categoriesId: id,
      },
      data: {
        typeId: typeEntries[type],
      },
    });
    if (!updateEntries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível atualizar os lançamentos desta categoria',
      });
    }
    if (!category) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível editar esta categoria',
      });
    }
    res.status(StatusCodes.OK).json({
      id: category.id,
      title: category.title,
      typeId: category.typeId,
    });
  }
}

export default new CategoryController();
