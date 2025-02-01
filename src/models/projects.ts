import { PrismaClient } from '@prisma/client';
import { IProject } from '../types/projects';

export const checkProjectAccess = async (
   project_id: string,
   user_id: string,
): Promise<boolean> => {
   const prisma = new PrismaClient();
   const project = await prisma.project.findFirst({
      where: {
         id: project_id,
         created_by: user_id,
      },
   });
   return project !== null;
};

export const getAllProjects = async (): Promise<IProject[]> => {
   const prisma = new PrismaClient();
   const projects = await prisma.project.findMany();
   return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      logo: project.logo,
      created_by: project.created_by,
      created_at: project.created_at.toISOString(),
      updated_at: project.updated_at.toISOString(),
   }));
};
