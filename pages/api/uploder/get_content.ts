///api/uploder/get_content
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Hardcoding userId as 7 for testing purposes
    const userId = Number(sessionStorage.getItem('userId'));
    const institutionId = Number(sessionStorage.getItem('institutionId'));
   
    // Fetch the content uploaded by the hardcoded userId (7)
    const uploadedContent = await prisma.content.findMany({
      where: {
        uploaderId: userId, // Fetch content uploaded by user with ID 7
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

    return res.status(200).json({ uploadedContent });
  } catch (error) {
    console.error('Error fetching uploaded content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
