import { Router } from 'express';
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import categoriesRouter from '../routers/categories.router';
import subCategoriesRouter from '../routers/subcategories.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subCategoriesRouter);

export default router;
