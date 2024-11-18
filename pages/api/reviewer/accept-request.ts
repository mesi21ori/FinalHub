import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requestId, reviewerId } = req.body;

  if (!requestId || !reviewerId) {
    return res.status(400).json({ message: 'Request ID and Reviewer ID are required' });
  }

  try {
    // Ensure `req.url` is safely handled in case it's undefined
    const status = req.url?.includes('accept') ? 'APPROVED' : 'REJECTED';

    // Update the access request in the database
    const updatedRequest = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status: status,
        reviewerId: parseInt(reviewerId, 10), // Convert reviewerId to an integer
      },
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
