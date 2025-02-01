import { Request, Response } from 'express';
import { IResponse } from '../types/response';
import { IProject } from '../types/projects';
import { getAllProjects } from '../models/projects';

export const getProjectsController = async (
   req: Request,
   res: Response,
): Promise<void> => {
   try {
      const projects = await getAllProjects();
      const response: IResponse<IProject[]> = {
         status: 200,
         message: 'Projects retrieved successfully',
         data: projects,
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
