import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust to your Prisma setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    try {
      // Find the report to get the associated comment and user ID
      const report = await prisma.commentReport.findUnique({
        where: { id: reportId },
        include: { comment: true, user: true },
      });

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      const { comment, user } = report;

      // Deactivate the user by setting 'isActive' to false
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: false }, // Mark the user as inactive
      });

      // Deactivate the comment by setting 'isActive' to false
      await prisma.comment.update({
        where: { id: comment.id },
        data: { isActive: false }, // Mark the comment as deactivated
      });

      // Mark the report as resolved
      await prisma.commentReport.update({
        where: { id: reportId },
        data: { resolved: true },
      });

      return res.status(200).json({ message: 'User deactivated, comment deactivated, and report resolved successfully' });
    } catch (error) {
      console.error('Error processing report:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
