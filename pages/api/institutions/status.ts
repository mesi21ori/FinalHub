// pages/api/institutions/status.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Example: Assume institution ID is passed as a query parameter
  const institutionId = parseInt(req.query.id as string, 10); // Parse the ID as an integer

  if (isNaN(institutionId)) {
    return res.status(400).json({ message: 'Invalid institution ID' });
  }

  try {
    const institution = await prisma.institution.findUnique({
      where: { id: institutionId },
      select: {
        registrationStatus: true,
      },
    });

    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' });
    }

    res.status(200).json(institution);
  } catch (error) {
    console.error('Error fetching institution status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
