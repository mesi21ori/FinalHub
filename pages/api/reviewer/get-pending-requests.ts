import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reviewerId } = req.query;

  // Validate reviewerId presence
  if (!reviewerId) {
    return res.status(400).json({ message: 'Reviewer ID is required' });
  }

  try {
    const reviewerIdNum = parseInt(reviewerId as string, 10);
    if (isNaN(reviewerIdNum)) {
      return res.status(400).json({ message: 'Reviewer ID must be a number' });
    }

    // Fetch pending requests, including researcher and content information
    const pendingRequests = await prisma.accessRequest.findMany({
      where: {
        reviewerId: null,
        status: 'PENDING',
      },
      include: {
        researcher: { select: { username: true } }, // Select the researcher's username
        content: { select: { title: true } },        // Select the content's title
      },
    });

    // Send back the pending requests as JSON
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
