import { Router } from 'express';
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import categoriesRouter from '../routers/categories.router';
import subCategoriesRouter from '../routers/subcategories.router';
import accountsRouter from '../routers/accounts.router';
import typeAccountsRouter from '../routers/typeAccounts.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subCategoriesRouter);
router.use('/accounts', accountsRouter);
router.use('/typeAccounts', typeAccountsRouter);

export default router;
