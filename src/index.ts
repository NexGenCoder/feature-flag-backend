import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
const prisma = new PrismaClient();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   }),
);

app.get('/hello', async (req: Request, res: Response) => {
   const helloWorldMessageFromDB = await prisma.demo.findFirst({
      where: {
         message: 'Hello world from database',
      },
   });

   res.json({
      message:
         helloWorldMessageFromDB?.message ||
         "Message from db doesn't came please check once",
      data: helloWorldMessageFromDB,
   });
});

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});

export { app, prisma };
