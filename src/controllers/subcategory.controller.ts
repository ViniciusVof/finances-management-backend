import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class SubCategoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const subCategories = await prisma.subCategories.findMany();
    res.status(StatusCodes.OK).json(subCategories);
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
  async update(req: Request, res: Response, next: NextFunction) {
    const { id, title, categoriesId } = req.body;
    const findCategory = await prisma.categories.findUnique({
      where: {
        id: categoriesId,
      },
    });

    if (!findCategory) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Nenhuma categoria pai encontrada.',
      });
    }
    const updateSubcategory = await prisma.subCategories.update({
      where: {
        id,
      },
      data: {
        title,
        categoriesId,
      },
    });
    if (!updateSubcategory) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível editar esta subcategoria.',
      });
    }
    const updateEntries = await prisma.entries.updateMany({
      where: {
        categoriesId: id,
      },
      data: {
        typeId: findCategory?.typeId || '',
      },
    });
    if (!updateEntries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message:
          'Não foi possível atualizar os lançamentos desta subCategoria.',
      });
    }
    res.status(StatusCodes.OK).json({
      id: updateSubcategory.id,
      title: updateSubcategory.title,
      categoriesId: updateSubcategory.categoriesId,
    });
  }
}

export default new SubCategoryController();
