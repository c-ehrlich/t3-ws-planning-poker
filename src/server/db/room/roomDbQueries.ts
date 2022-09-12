import { PrismaClient } from '@prisma/client';
import { nanoid } from '../../../utils/nanoid';

export async function createRoom({ prisma }: { prisma: PrismaClient }) {
  const publicId = nanoid();
  return prisma.room.create({
    data: {
      publicId,
    },
  });
}
