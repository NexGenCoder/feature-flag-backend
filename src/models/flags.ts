import { IFlag } from '../types/flags';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFlags = async (): Promise<IFlag[]> => {
   const flags = await prisma.flag.findMany();
   return flags.map((flag) => ({
      id: flag.id,
      name: flag.name,
      description: flag.description,
      key: flag.key,
      project_id: flag.project_id,
      environment_id: flag.environment_id,
      is_active: flag.is_active,
      expires_at: flag.expires_at,
      created_at: flag.created_at.toISOString(),
      updated_at: flag.updated_at.toISOString(),
      added_by: flag.added_by,
   }));
};
