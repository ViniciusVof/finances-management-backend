import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';

class TypeAccountsController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const typeAccounts = await prisma.typeAccounts.findMany();
    res.status(StatusCodes.OK).json(typeAccounts);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    const typeAccounts = await prisma.typeAccounts.create({
      data: {
        title,
      },
    });
    if (!typeAccounts) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Não foi possível cadastrar um novo tipo de conta',
      });
    }
    res.status(StatusCodes.OK).json({
      id: typeAccounts.id,
      title: typeAccounts.title,
    });
  }
}

export default new TypeAccountsController();
