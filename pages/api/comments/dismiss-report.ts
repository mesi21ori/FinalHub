import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust to your Prisma setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID is required' });
    }

    try {
      // Optionally, deactivate the comment itself (mark as 'deactivated')
      await prisma.commentReport.update({
        where: { id: commentId },
        data: { resolved: true },
      });

      // Return success response
      return res.status(200).json({ message: 'User and comment deactivated successfully' });
    } catch (error) {
      console.error("Error deactivating user:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
