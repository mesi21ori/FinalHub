import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contentType } = req.query;

  if (!contentType || typeof contentType !== 'string') {
    return res.status(400).json({ error: 'Content type is required' });
  }

  try {
    // Validate the contentType
    const validContentTypes: ContentType[] = [
      'VIDEO',
      'BOOK',
      'MUSIC',
      'ARTICLE',
      'ARTIFACT',
    ];
    if (!validContentTypes.includes(contentType as ContentType)) {
      return res.status(400).json({ error: 'Invalid content type' });
    }

    // Fetch content based on the contentType
    const content = await prisma.content.findMany({
      where: { contentType: contentType as ContentType },
      select: {
        id: true,
        title: true,
        description: true,
        contentType: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        fileUrl: true,
        // Add content-specific details based on the contentType
        videoDetails: contentType === 'VIDEO' ? true : false,
        bookDetails: contentType === 'BOOK' ? true : false,
        musicDetails: contentType === 'MUSIC' ? true : false,
        articleDetails: contentType === 'ARTICLE' ? true : false,
        artifactDetails: contentType === 'ARTIFACT' ? true : false,
      },
    });

    // Return the content data
    res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content by type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
