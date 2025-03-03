import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all feedback with related user data (if applicable)
      const feedback = await prisma.feedback.findMany({
        include: {
          user: true, // Include user data (like username and avatar) if needed
        },
      });

      // Map feedback data into a format that matches the frontend structure
      const mappedFeedback = feedback.map((item) => ({
        user: item.user.firstName, // Assuming you have a 'name' field in User model
        avatar: item.user.profilePicture, // Assuming the avatar is in the 'avatar' field
        rating: item.rating,
        comment: item.content,
      }));

      res.status(200).json(mappedFeedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
