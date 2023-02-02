import { Router } from 'express';
import rescue from 'express-rescue';
import typeEntriesController from '../controllers/typeEntries.controller';
import authMiddleware from '../middlewares/auth';

const typesEntriesRouter = Router();

typesEntriesRouter
  .route('/')
  .post(authMiddleware, rescue(typeEntriesController.create));

typesEntriesRouter
  .route('/')
  .get(authMiddleware, rescue(typeEntriesController.findAll));

export default typesEntriesRouter;
