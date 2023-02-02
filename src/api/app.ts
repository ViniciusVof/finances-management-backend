import express from 'express';
import cors from 'cors';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br';

import errorMiddleware from '../middlewares/error';
import routes from './routes';

const app = express();

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

app.use(express.json()).use(cors()).use(routes).use(errorMiddleware);

export default app;
