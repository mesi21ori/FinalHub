import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust to your Prisma setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { reportId } = req.body; // Receive the reportId to find the corresponding comment

    if (!reportId) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    try {
      // Find the report to get the associated commentId
      const report = await prisma.commentReport.findUnique({
        where: { id: reportId },
        include: { comment: true },
      });

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      const commentId = report.commentId;

      // Deactivate the original comment (set isActive to false)
      await prisma.comment.update({
        where: { id: commentId },
        data: { isActive: false },
      });

      // Mark the report as resolved
      await prisma.commentReport.update({
        where: { id: reportId },
        data: { resolved: true },
      });

      // Optionally, notify the user who reported the comment (not implemented here)

      return res.status(200).json({ message: 'Comment deactivated and report resolved successfully' });
    } catch (error) {
      console.error('Error processing report:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
