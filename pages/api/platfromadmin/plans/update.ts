// src/pages/api/plans/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Utility to parse and validate request data
const parseRequest = (req: NextApiRequest) => {
  const { id, name, price, validity, features, freeTrial, trialDuration } = req.body;
  if (!id || !name || !Array.isArray(features)) {
    throw new Error('Invalid request data');
  }
  return {
    name,
    price: freeTrial ? 0 : Number(price),
    validity: freeTrial ? null : validity,
    features,
    freeTrial: Boolean(freeTrial),
    trialDuration: freeTrial ? trialDuration : null,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data = parseRequest(req);
    const { id } = req.body;
    const updatedPlan = await prisma.subscriptionPlan.update({
      where: { id: Number(id) },
      data,
    });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
