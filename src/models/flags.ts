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

export const createFlag = async (flag: IFlag): Promise<IFlag> => {
   const createdFlag = await prisma.flag.create({
      data: {
         name: flag.name,
         description: flag.description,
         key: flag.key,
         project_id: flag.project_id,
         environment_id: flag.environment_id,
         is_active: flag.is_active,
         expires_at: flag.expires_at,
         added_by: flag.added_by,
      },
   });
   return {
      id: createdFlag.id,
      name: createdFlag.name,
      description: createdFlag.description,
      key: createdFlag.key,
      project_id: createdFlag.project_id,
      environment_id: createdFlag.environment_id,
      is_active: createdFlag.is_active,
      expires_at: createdFlag.expires_at,
      created_at: createdFlag.created_at.toISOString(),
      updated_at: createdFlag.updated_at.toISOString(),
      added_by: createdFlag.added_by,
   };
};

export const checkDuplicateKey = async (
   key: string,
   project_id: string,
): Promise<boolean> => {
   const flag = await prisma.flag.findFirst({
      where: {
         key,
         project_id,
      },
   });
   return flag !== null;
};
