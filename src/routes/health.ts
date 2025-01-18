import express, { Request, Response } from 'express';
import { prisma } from '..';

export default (router: express.Router) => {
   router.get('/health', async (req: Request, res: Response) => {
      try {
         await prisma.$queryRaw`SELECT 1`;

         res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {
               api: 'up',
               database: 'up',
            },
         });
      } catch (error) {
         console.error('Health check failed:', error);
         res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            services: {
               api: 'up',
               database: 'down',
            },
            error: 'Database connection failed',
         });
      }
   });
};
