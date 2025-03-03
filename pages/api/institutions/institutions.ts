// pages/api/institutions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const institutions = await prisma.institution.findMany({
      include: {
        admin: true, // Include the admin user data if needed
      },
    });
    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institutions' });
  } finally {
    await prisma.$disconnect();
  }
}
