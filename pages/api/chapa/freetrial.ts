import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const generateTransactionReference = (): string =>
  `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

const calculateEndDate = (trialDuration: string | null): Date => {
  const startDate = new Date();

  if (trialDuration) {
    const trialDurationInDays = parseInt(trialDuration, 10);
    if (isNaN(trialDurationInDays)) {
      throw new Error('Invalid trial duration');
    }
    startDate.setDate(startDate.getDate() + trialDurationInDays);
    return startDate;
  }

  // Default behavior if trial duration is not set
  startDate.setDate(startDate.getDate() + 30);  // Default to 30 days for free trial
  return startDate;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { email, userId, planId, trialDuration } = req.body;

  // Validation of input
  if (!email || !userId || !planId) {
    return res.status(400).json({ error: 'Missing required input fields' });
  }

  try {
    const userIdInt = parseInt(userId, 10);
    const now = new Date();

    // Fetch the subscription plan details
    const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!subscriptionPlan) {
      return res.status(400).json({ error: `Plan with ID ${planId} does not exist.` });
    }

    // Check if the user already has a subscription
    const userSubscription = await prisma.userSubscription.findFirst({
      where: { userId: userIdInt },
      orderBy: { endDate: 'desc' },
    });

    if (userSubscription && userSubscription.isActive) {
      return res.status(400).json({ error: 'You already have an active subscription.' });
    }

    // Check if the user is eligible for a free trial
    if (userSubscription && userSubscription.Goesto) {
      return res.status(400).json({ error: 'You are not a new user. Free trial is not available.' });
    }

    // Generate transaction reference for the free trial (even though no actual payment is involved)
    const txRef = generateTransactionReference();

    // Calculate the trial end date based on the trial duration
    const endDate = calculateEndDate(trialDuration);

    // If there's no existing active subscription, we create a new subscription
    // But if we need to update the existing subscription, we can update it here
    let updatedSubscription;
    
    if (userSubscription) {
      // Update the existing subscription if it exists
      updatedSubscription = await prisma.userSubscription.update({
        where: {
          id: userSubscription.id, // Use the unique id to identify the subscription
        },
        data: {
          planId,
          transactionId: txRef,
          startDate: now,
          endDate,
          Goesto: false,  // Mark this as free trial
          isActive: true,  // The subscription is activated for the free trial
        },
      });
    } else {
      // Create a new subscription if it doesn't exist
      updatedSubscription = await prisma.userSubscription.create({
        data: {
          userId: userIdInt,
          planId,
          transactionId: txRef,
          startDate: now,
          endDate,
          Goesto: false,  // Mark this as free trial
          isActive: true,  // The subscription is activated for the free trial
        },
      });
    }

    return res.status(200).json({ message: 'Free trial updated successfully.' });
  } catch (error) {
    console.error('Error processing free trial:', error);
    return res.status(500).json({
      error: 'An error occurred while processing the free trial. Please try again later.',
    });
  }
};

export default handler;
