import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class TypeEntriesController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const typeEntries = await prisma.typeEntries.findMany({
      include: {
        Categories: {
          include: {
            subcategories: true,
          },
        },
      },
    });
    res.status(StatusCodes.OK).json(typeEntries);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    const typeEntries = await prisma.typeEntries.create({
      data: {
        title,
      },
    });
    if (!typeEntries) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar um novo tipo de lançamento',
      });
    }
    res.status(StatusCodes.OK).json({
      id: typeEntries.id,
      title: typeEntries.title,
    });
  }
}

export default new TypeEntriesController();
