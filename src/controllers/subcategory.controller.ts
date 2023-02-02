import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class SubCategoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const categories = await prisma.categories.findMany();
    res.status(StatusCodes.OK).json(categories);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, categoriesId } = req.body;
    const subCategory = await prisma.subCategories.create({
      data: {
        title,
        categoriesId,
      },
    });
    if (!subCategory) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar uma nova subcategoria',
      });
    }
    res.status(StatusCodes.OK).json({
      id: subCategory.id,
      title: subCategory.title,
    });
  }
}

export default new SubCategoryController();
