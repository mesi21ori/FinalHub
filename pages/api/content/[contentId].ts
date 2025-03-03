// api/content/[contentId].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId } = req.query;  // Change `id` to `contentId`

  console.log("Received content ID from request:", contentId);

  if (typeof contentId === 'string') {
    const parsedId = parseInt(contentId, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: 'Invalid content ID' });
    }

    try {
      const content = await prisma.content.findUnique({
        where: { id: parsedId },
        include: {
          bookDetails: true,
          videoDetails: true,
          musicDetails: true,
          artifactDetails: true,
          articleDetails: true,
        },
      });

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.status(200).json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(400).json({ error: 'Invalid content ID' });
}
