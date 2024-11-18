// pages/api/users/report.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const reportComment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Extract commentId, userId, and reason from the body
    const { commentId, userId, reason } = req.body;

    if (!commentId || !userId || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Assuming you have a Prisma model setup for CommentReport
      const newReport = await prisma.commentReport.create({
        data: {
          commentId,
          userId,
          reason,
        },
      });

      return res.status(200).json(newReport);
    } catch (error) {
      console.error('Error submitting report:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Only allow POST requests
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default reportComment;
