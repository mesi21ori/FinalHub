import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the method is GET
  if (req.method === 'GET') {
    try {
      const { contentId } = req.query;

      // If contentId is missing or invalid
      if (!contentId) {
        return res.status(400).json({ message: 'Content ID is required' });
      }

      // Fetch comments for the specified content
      const comments = await prisma.comment.findMany({
        where: {
          contentId: Number(contentId), // Ensure contentId is treated as a number
          parentId: null, // Only get root comments
          isActive:true
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  firstName: true,
                  lastName: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'asc', // Order by createdAt for chronological order
        },
      });

      // Return the comments with their replies
      return res.status(200).json(comments);

    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    // If the method is not GET, return Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
