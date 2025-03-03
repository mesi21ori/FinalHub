// src/pages/api/plans/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const plans = await prisma.subscriptionPlan.findMany({
      
    });
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
