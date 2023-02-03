import { Router } from 'express';
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import categoriesRouter from '../routers/categories.router';
import subCategoriesRouter from '../routers/subcategories.router';
import accountsRouter from '../routers/accounts.router';
import typeAccountsRouter from '../routers/typeAccounts.router';
import typeEntriesRouter from '../routers/typeEntries.router';
import entriesRouter from '../routers/entries.router';
import dashboardRouter from '../routers/dashboard.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subCategoriesRouter);
router.use('/accounts', accountsRouter);
router.use('/typeAccounts', typeAccountsRouter);
router.use('/typeEntries', typeEntriesRouter);
router.use('/entries', entriesRouter);
router.use('/dashboard', dashboardRouter);

export default router;
