import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma'; // Ensure this imports your Prisma client

const getSubscriptionsWithCancellationReason = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Fetch user subscriptions that have a cancellation reason
    const subscriptions = await prisma.userSubscription.findMany({
      where: {
        cancellationReason: {
          not: null, // Filter to include only rows where cancellationReason is not null
        },
      },
      include: {
        user: {
          select: { firstName: true, lastName: true }, // Fetch user names
        },
        plan: {
          select: { name: true, price: true }, // Fetch plan name and price
        },
      },
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions with cancellation reasons:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};

export default getSubscriptionsWithCancellationReason;
