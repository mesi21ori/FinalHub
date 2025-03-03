import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Content ID passed as a query parameter

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const contentId = Number(id);

    if (isNaN(contentId)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }

    const { isActive, reviewerId } = req.body; // Get both isActive and reviewerId from the request body

    // Ensure reviewerId is valid
    if (!reviewerId) {
      return res.status(400).json({ message: 'Reviewer ID is required' });
    }

    // Update the active status and reviewerId of the content
    const updatedContent = await prisma.content.update({
      where: { id: contentId },
      data: { 
        isActive,
        reviwerId: Number(reviewerId) // Store reviewerId in the database
      },
    });

    return res.status(200).json({ updatedContent });
  } catch (error) {
    console.error('Error updating content status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
