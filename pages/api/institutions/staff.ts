// pages/api/institutions/staff-list.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query;

  if (!institutionId || isNaN(Number(institutionId))) {
    return res.status(400).json({ message: 'Invalid institution ID' });
  }

  try {
    // Fetch all users belonging to the given institutionId
    const staff = await prisma.user.findMany({
      where: { institutionId: Number(institutionId) },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
