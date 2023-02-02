import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';

const saltRounds = 15;
class UserController {
  async listAll(req: Request, res: Response, next: NextFunction) {
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
      if (!newUser) {
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: 'Não foi possível cadastrar um novo usuário',
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
      fullname: user.fullname,
      email: user.email,
    });
  }
}

export default new UserController();
