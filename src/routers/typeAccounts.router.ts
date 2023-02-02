import { Router } from 'express';
import rescue from 'express-rescue';
import typeAccountsController from '../controllers/typeAccounts.controller';
import authMiddleware from '../middlewares/auth';

const typeAccountsRouter = Router();

typeAccountsRouter
  .route('/')
  .post(authMiddleware, rescue(typeAccountsController.create));

typeAccountsRouter
  .route('/')
  .get(authMiddleware, rescue(typeAccountsController.findAll));

export default typeAccountsRouter;
