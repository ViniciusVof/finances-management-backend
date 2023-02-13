import { Router } from 'express';
import rescue from 'express-rescue';
import subCategoryController from '../controllers/subcategory.controller';
import authMiddleware from '../middlewares/auth';

const subcategoriesRouter = Router();

subcategoriesRouter
  .route('/')
  .post(authMiddleware, rescue(subCategoryController.create));

subcategoriesRouter
  .route('/')
  .get(authMiddleware, rescue(subCategoryController.findAll));
subcategoriesRouter
  .route('/')
  .put(authMiddleware, rescue(subCategoryController.update));
subcategoriesRouter
  .route('/:id')
  .delete(authMiddleware, rescue(subCategoryController.deleteSubcategory));

export default subcategoriesRouter;
