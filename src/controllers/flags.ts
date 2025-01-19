import { getAllFlags, checkDuplicateKey, createFlag } from '../models/flags';
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

export const createFlagController = async (
   req: Request,
   res: Response,
): Promise<void> => {
   const flag: IFlag = req.body;
   try {
      const isDuplicate = await checkDuplicateKey(flag.key, flag.project_id);
      if (isDuplicate) {
         const response: IResponse<IFlag> = {
            status: 400,
            message: 'Flag key already exists',
            data: flag,
         };
         res.status(400).json(response);
         return;
      }

      const createdFlag = await createFlag(flag);
      const response: IResponse<IFlag> = {
         status: 201,
         message: 'Flag created successfully',
         data: createdFlag,
      };
      res.status(201).json(response);
   } catch (error: unknown) {
      if (error instanceof Error) {
         res.status(500).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'An unknown error occurred' });
      }
   }
};
