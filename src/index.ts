import express, {
   ErrorRequestHandler,
   NextFunction,
   Request,
   Response,
} from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';
import { STATUS_CODES } from 'http';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
export const prisma = new PrismaClient();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   }),
);

app.use('/', router());

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof Error) {
      // Handle standard Error object
      res.status(500).send({
         messge: err.message || STATUS_CODES[500],
         statusCode: 500,
         data: 'production' !== process.env.NODE_ENV ? err.stack : null,
      });
   } else if (typeof err === 'string') {
      //handle if error is string
      res.status(500).send({
         message: err || STATUS_CODES[500],
         statusCode: 500,
         data: null,
      });
   } else {
      // Handle other error types
      res.status(500).send({
         message: STATUS_CODES[500],
         statusCode: 500,
         data: null,
      });
      res.status(500).send('Unknown error occurred');
   }
});

app.listen(PORT, () => {
   console.warn(`Server is running at http://localhost:${PORT}`);
});

export { app };
