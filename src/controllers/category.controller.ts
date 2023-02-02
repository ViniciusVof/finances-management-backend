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
      },
    });
    res.status(StatusCodes.OK).json(categories);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, userId } = req.body;
    const category = await prisma.categories.create({
      data: {
        title,
        userId,
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
    });
  }
}

export default new CategoryController();
