import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Assuming you've configured Prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query;

  // Ensure the institutionId is passed in the query
  if (!institutionId || typeof institutionId !== 'string') {
    return res.status(400).json({ message: 'Institution ID is required' });
  }

  try {
    // Fetch content uploaded by users within the institution
    const contentList = await prisma.content.findMany({
      where: {
        institutionId: Number(institutionId), // Institution ID from the query
      },
      include: {
        uploader: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });

    // Return the content list to the frontend
    return res.status(200).json(contentList);
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ message: 'Error fetching content' });
  }
}
