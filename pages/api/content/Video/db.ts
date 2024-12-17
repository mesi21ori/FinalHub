// lib/db.ts
import { PrismaClient } from '@prisma/client'; // Assuming you're using Prisma ORM

const prisma = new PrismaClient();

export const updateVideoStatus = async (id: number, isActive: boolean) => {
  try {
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        videoDetails: {
          update: {
            isActive: isActive,
          },
        },
      },
    });
    return updatedContent;
  } catch (error) {
    console.error('Error updating video status:', error);
    throw new Error('Failed to update video status');
  }
};
