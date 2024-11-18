// pages/api/feedback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { content, userId } = req.body;

  // Validate the input data
  if (!content || !userId) {
    return res.status(400).json({ message: 'Content and userId are required' });
  }

  try {
    // Create a new feedback entry
    const feedback = await prisma.feedback.create({
      data: {
        content,
        userId,
      },
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
