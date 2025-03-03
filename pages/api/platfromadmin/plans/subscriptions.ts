import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === 'GET') {
      // Fetch all user subscriptions along with their details
      const subscriptions = await prisma.userSubscription.findMany({
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          plan: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });

      const subscriptionDetails = subscriptions.map(sub => ({
        user: `${sub.user.firstName} ${sub.user.lastName} (${sub.user.username})`,
        plan: sub.plan.name,
        status: sub.isActive ? 'Active' : 'Inactive',
        payment: sub.plan.price,
        startDate: sub.startDate.toISOString().split('T')[0],
        endDate: sub.endDate.toISOString().split('T')[0],
      }));

      res.status(200).json(subscriptionDetails);
    }

    if (req.method === 'PUT') {
      // Update subscription status (deactivate or cancel the subscription)
      const { subscriptionId, isActive } = req.body; // Expecting subscriptionId and isActive flag in the request body

      if (!subscriptionId || typeof isActive !== 'boolean') {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const updatedSubscription = await prisma.userSubscription.update({
        where: { id: subscriptionId },
        data: { isActive }, // Deactivate the subscription if 'isActive' is set to false
      });

      res.status(200).json({ message: 'Subscription updated successfully', updatedSubscription });
    }
  } catch (error) {
    console.error('Error fetching or updating subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
