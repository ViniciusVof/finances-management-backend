import { Router } from 'express';
import rescue from 'express-rescue';
import typeAccountsController from '../controllers/typeAccounts.controller';
import authMiddleware from '../middlewares/auth';

const accountsRouter = Router();

accountsRouter
  .route('/')
  .post(authMiddleware, rescue(typeAccountsController.create));

accountsRouter
  .route('/')
  .get(authMiddleware, rescue(typeAccountsController.findAll));

export default accountsRouter;
