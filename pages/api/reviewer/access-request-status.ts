import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, contentId } = req.query;

  if (!userId || !contentId) {
    return res.status(400).json({ error: 'User ID and Content ID are required' });
  }

  try {
    // Check if there is an access request for the user on the given content
    const accessRequest = await prisma.accessRequest.findFirst({
      where: {
        userId: parseInt(userId as string),
        contentId: parseInt(contentId as string),
      },
    });

    if (!accessRequest) {
      return res.status(404).json({ error: 'No access request found' });
    }

    // Return the status of the access request
    return res.status(200).json({ status: accessRequest.status });
  } catch (error) {
    console.error("Error checking access request:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
