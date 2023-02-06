import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { getInitialCategories } from '../data/categories';

const saltRounds = 15;
class UserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findMany();
    res.status(StatusCodes.OK).json(user);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { fullname, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      const cryptedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await prisma.user.create({
        data: {
          fullname,
          email,
          password: cryptedPassword,
        },
      });

      const accounts = prisma.accounts.create({
        data: {
          userId: newUser.id,
          initialBalance: '0',
          bankAccount: 'Conta inicial',
          typeAccountsId:
            process.env.DEFAULT_TYPE_ACCOUNTS_ID ||
            '488f33a1-f3f9-4534-b6fc-651aa6643e1d',
        },
      });

      const categories = prisma.categories.createMany({
        data: getInitialCategories(newUser.id),
      });

      if (!newUser) {
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: 'Não foi possível cadastrar um novo usuário',
        });
      }
      const transaction = await prisma.$transaction([accounts, categories]);

      if (!transaction) {
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: 'Não foi possível cadastrar novos dados para o usuário',
        });
      }
      res.status(StatusCodes.OK).json({
        fullname,
        email,
      });
    }
    if (user) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: 'Usuário já cadastrado',
      });
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!user) {
      return next({
        status: StatusCodes.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }
    res.status(StatusCodes.OK).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
  }
}

export default new UserController();
