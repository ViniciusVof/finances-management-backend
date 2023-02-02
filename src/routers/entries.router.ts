import { Router } from 'express';
import rescue from 'express-rescue';
import entriesController from '../controllers/entries.controller';
import authMiddleware from '../middlewares/auth';

const entriesRouter = Router();

entriesRouter.route('/').post(authMiddleware, rescue(entriesController.create));

entriesRouter.route('/').get(authMiddleware, rescue(entriesController.findAll));

export default entriesRouter;
