import { getAllFlags } from '../models/flags';
import { Request, Response } from 'express';
import { IResponse } from '../types/response';
import { IFlag } from '../types/flags';

export const getFlagsController = async (
   req: Request,
   res: Response,
): Promise<void> => {
   try {
      const flags = await getAllFlags();
      const response: IResponse<IFlag[]> = {
         status: 200,
         message: 'Flags retrieved successfully',
         data: flags,
      };

      res.status(200).json(response);
   } catch (error: unknown) {
      if (error instanceof Error) {
         res.status(500).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'An unknown error occurred' });
      }
   }
};
