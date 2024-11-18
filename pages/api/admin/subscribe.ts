import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { DurationType, Role } from '@prisma/client'; // Import Role
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { planId } = req.body;

  try {
    // Find the subscription plan
    const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!subscriptionPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    // Create a new subscription for the user
    const userSubscription = await prisma.userSubscription.create({
      data: {
        user: { connect: { id: Number(session.user.id) } }, // Ensure ID is a number
        plan: { connect: { id: subscriptionPlan.id } },
        startDate: new Date(),
        endDate: calculateEndDate(subscriptionPlan.duration), // Ensure duration is handled
      },
    });

    // Update user role
    await prisma.user.update({
      where: { id: Number(session.user.id) }, // Ensure ID is a number
      data: {
        role: Role.PREMIUM_USER, // Use the Role enum
        subscriptionId: userSubscription.id,
      },
    });

    return res.status(200).json({ message: 'Subscription successful', userSubscription });
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Helper function to calculate the end date based on duration
function calculateEndDate(duration: DurationType): Date {
  const now = new Date();
  switch (duration) {
    case 'DAILY':
      return new Date(now.setDate(now.getDate() + 1));
    case 'MONTHLY':
      return new Date(now.setMonth(now.getMonth() + 1));
    case 'YEARLY':
      return new Date(now.setFullYear(now.getFullYear() + 1));
    default:
      return now;
  }
}
