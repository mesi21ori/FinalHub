// pages/api/users/feedback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { content, userId, rating } = req.body;

  if (!content || !userId || rating === undefined) {
    return res.status(400).json({
      message: 'Content, userId, and rating are required',
    });
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        content,
        rating: Number(rating),

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback,
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}