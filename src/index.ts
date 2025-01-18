import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
export const prisma = new PrismaClient();

app.use('/', router);
app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   }),
);

app.listen(PORT, () => {
   // eslint-disable-next-line no-console
   console.log(`Server is running at http://localhost:${PORT}`);
});

export { app };
