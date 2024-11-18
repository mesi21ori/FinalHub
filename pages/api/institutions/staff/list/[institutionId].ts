// pages/api/institutions/staff/list/[institutionId].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query;

  if (req.method !== 'GET') {
    return res.setHeader('Allow', ['GET']).status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  if (!institutionId || Array.isArray(institutionId)) {
    return res.status(400).json({ message: 'Invalid institution ID' });
  }

  try {
    const staffMembers = await prisma.user.findMany({
      where: {
        institutionId: Number(institutionId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!staffMembers.length) {
      return res.status(404).json({ message: 'No staff members found for this institution.' });
    }

    res.status(200).json({ staffMembers });
  } catch (error) {
    console.error('Error fetching staff members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
