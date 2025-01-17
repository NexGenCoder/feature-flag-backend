import express, { Request, Response } from 'express';
import { prisma } from '..';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const helloWorldMessageFromDB = await prisma.demo.findFirst({
         where: {
            message: 'Hello World',
         },
      });

      res.json({
         message:
            helloWorldMessageFromDB?.message ||
            'Message from db doesnt came please check once',
         data: helloWorldMessageFromDB,
      });
   } catch (error) {
      console.error('Something went wrong ', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

export default router;
