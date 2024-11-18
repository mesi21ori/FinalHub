// pages/api/admin/get-subscription-plans.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow only GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch all subscription plans from the database
    const subscriptionPlans = await prisma.subscriptionPlan.findMany();
    return res.status(200).json(subscriptionPlans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
