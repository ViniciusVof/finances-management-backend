import express from 'express';
import routes from './routes';

import errorMiddleware from '../middlewares/error';

const app = express();

app.use(express.json()).use(routes).use(errorMiddleware);

export default app;
