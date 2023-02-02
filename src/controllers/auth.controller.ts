import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';
import jwt from '../utils/jwt';

class AuthController {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Todos os campos são obrigatórios"
            })
        } 
        const user = await prisma.user.findUnique({ where: {email}});

        if (!user) { 
          return next({
            status: StatusCodes.NOT_FOUND,
            message: "Usuário não encontrado"
          });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return next({
            status: StatusCodes.UNAUTHORIZED,
            message: "Senha inválida"
          })
        }

        const token = jwt.sign({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        })

        res.status(StatusCodes.OK).json({
          Authorization: token
        })
    }
}

export default new AuthController();