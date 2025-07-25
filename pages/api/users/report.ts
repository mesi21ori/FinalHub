import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const reportComment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { commentId, userId, reason, additionalDetails } = req.body;

    // Validate required fields
    if (!commentId || !userId || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Save the report in the database
      const newReport = await prisma.commentReport.create({
        data: {
          commentId,
          userId,
          reason,
          additionalDetails: additionalDetails || null, // Handle optional field
        },
      });

      return res.status(200).json(newReport); // Return the created report
    } catch (error) {
      console.error('Error creating report:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Respond with Method Not Allowed for non-POST requests
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default reportComment;
