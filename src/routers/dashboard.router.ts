import { Router } from 'express';
import rescue from 'express-rescue';
import dashboardController from '../controllers/dashboard.controller';
import authMiddleware from '../middlewares/auth';

const userRouter = Router();

userRouter
  .route('/')
  .get(authMiddleware, rescue(dashboardController.getInfoDash));

export default userRouter;
