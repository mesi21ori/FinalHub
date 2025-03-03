import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Utility to parse and validate request data
const parseRequest = (req: NextApiRequest) => {
  const { name, price, validity, features, freeTrial, trialDuration } = req.body;

  // Validate required fields
  if (!name || !Array.isArray(features)) {
    throw new Error('Invalid request data: "name" and "features" are required.');
  }

  // Return structured data
  return {
    name,
    price: freeTrial ? 0 : Number(price || 0), // Default price to 0 if free trial
    validity: freeTrial ? null : validity || null, // Null validity for free trials
    features,
    freeTrial: Boolean(freeTrial), // Ensure boolean
    trialDuration: freeTrial ? trialDuration || null : null, // Null trialDuration if not free trial
    isActive: true, // Default to active for new plans
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    console.log('Incoming Request:', req.body);
    const data = parseRequest(req);
    console.log('Data sent to Prisma:', data);

    const plan = await prisma.subscriptionPlan.create({ data });
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    res.status(400).json({ error: (error as Error).message, details: error });
  }
}
