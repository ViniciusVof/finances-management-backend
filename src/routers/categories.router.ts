import { Router } from 'express';
import rescue from 'express-rescue';
import categoryController from '../controllers/category.controller';
import authMiddleware from '../middlewares/auth';

const categoriesRouter = Router();

categoriesRouter
  .route('/')
  .post(authMiddleware, rescue(categoryController.create));

categoriesRouter
  .route('/')
  .get(authMiddleware, rescue(categoryController.findAll));
categoriesRouter
  .route('/')
  .put(authMiddleware, rescue(categoryController.updateCategory));
categoriesRouter
  .route('/:id/:categoriesId')
  .delete(authMiddleware, rescue(categoryController.deleteCategory));

export default categoriesRouter;
