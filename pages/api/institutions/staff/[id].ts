import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';  // Using bcryptjs (or bcrypt if preferred)

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Invalid isActive value' });
    }

    try {
      // Update the staff member's status
      const updatedStaff = await prisma.user.update({
        where: { id: Number(id) },
        data: { isActive },
      });

      res.status(200).json(updatedStaff);
    } catch (error) {
      console.error('Error updating staff status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
