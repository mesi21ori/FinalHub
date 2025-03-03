import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, contentId } = req.query;

  // Validate request query parameters
  if (!userId || !contentId) {
    return res.status(400).json({ error: 'User ID and Content ID are required' });
  }

  try {
    // Fetch the access request record for the given user and content
    const accessRequest = await prisma.accessRequest.findFirst({
      where: {
        userId: parseInt(userId as string),
        contentId: parseInt(contentId as string),
      },
    });

    if (!accessRequest) {
      // No access request found for the given user and content
      return res.status(200).json({ status: 'NONE' });
    }

    // Check the status of the access request and return it
    switch (accessRequest.status) {
      case 'PENDING':
        return res.status(200).json({ status: 'PENDING', message: 'Your access request is pending approval.' });
      case 'APPROVED':
        return res.status(200).json({ status: 'APPROVED', message: 'Your access request has been approved.' });
      case 'REJECTED':
        return res.status(200).json({ status: 'REJECTED', message: 'Your access request was rejected.' });
      default:
        return res.status(500).json({ error: 'Unknown status encountered.' });
    }
  } catch (error) {
    console.error('Error checking access request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
