import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId, userId, text } = req.body;

  if (req.method === 'POST') {
    try {
      console.log('Received request data:', req.body);

      if (!contentId || !userId || !text) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create a new comment
      const newComment = await prisma.comment.create({
        data: {
          text,
          userId: parseInt(userId, 10),
          contentId: parseInt(contentId, 10),
        },
      });

      console.log('New comment created:', newComment);
      res.status(201).json(newComment);
    } catch (error) {
      // Typecast the error to `any` or `Error`
      const typedError = error as Error;

      console.error('Error during comment creation:', typedError.message);
      res.status(500).json({ message: 'Server error', error: typedError.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
