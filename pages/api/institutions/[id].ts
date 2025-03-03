// pages/api/institutions/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get institution ID from the URL

  if (req.method === 'GET') {
    try {
      const institution = await prisma.institution.findUnique({
        where: {
          id: parseInt(id as string), // Convert the ID from string to number
        },
        include: {
          // Include the related admin if needed (optional)
          admin: true,
        },
      });

      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }

      return res.status(200).json(institution); // Return the institution data
    } catch (error) {
      console.error('Error fetching institution:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
