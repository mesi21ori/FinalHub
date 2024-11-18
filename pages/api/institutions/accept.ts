import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Institution ID is required' });
    }

    try {
      const updatedInstitution = await prisma.institution.update({
        where: { id: parseInt(id, 10) },  // Convert id to integer
        data: { registrationStatus: 'APPROVED' },
      });

      res.status(200).json(updatedInstitution);
    } catch (error) {
      console.error('Error updating institution status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
