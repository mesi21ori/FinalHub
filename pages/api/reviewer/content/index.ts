import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query; // Institution ID passed as a query parameter

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const institutionIdNum = Number(institutionId);

    if (isNaN(institutionIdNum)) {
      return res.status(400).json({ message: 'Invalid institution ID' });
    }

    // Fetch inactive content uploaded by the specified institution
    const contentList = await prisma.content.findMany({
      where: {
        institutionId: institutionIdNum,
        isActive: false,
      },
      include: {
        institution: true,
        bookDetails: true,
        videoDetails: true,
        musicDetails: true,
        artifactDetails: true,
        articleDetails: true,
      },
    });

    return res.status(200).json({ contentList });
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
