import { Router } from 'express';
import rescue from 'express-rescue';
import accountsController from '../controllers/accounts.controller';
import authMiddleware from '../middlewares/auth';

const accountsRouter = Router();

accountsRouter
  .route('/')
  .post(authMiddleware, rescue(accountsController.create));

accountsRouter
  .route('/')
  .get(authMiddleware, rescue(accountsController.findAll));

export default accountsRouter;
