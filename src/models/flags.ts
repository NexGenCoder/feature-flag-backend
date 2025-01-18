import { IFlag } from '../types/flags';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFlags = async (): Promise<IFlag[]> => {
   const flags = await prisma.flag.findMany();
   return flags.map((flag) => ({
      ...flag,
      is_Active: flag.is_active,
      expires_At: flag.expires_at,
      created_At: flag.created_at.toISOString(),
      updated_At: flag.updated_at.toISOString(),
   }));
};
