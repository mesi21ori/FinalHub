// pages/api/subscriptions/metrics.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const getMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const activeSubscriptions = await prisma.userSubscription.count({
      where: { isActive: true },
    });

    const totalSubscriptions = await prisma.userSubscription.count();

    const churnRate = totalSubscriptions
      ? ((await prisma.userSubscription.count({ where: { isActive: false } })) /
          totalSubscriptions) *
        100
      : 0;

    const pendingRenewals = await prisma.userSubscription.count({
      where: {
        endDate: {
          lte: new Date(),
        },
        isActive: false,
      },
    });

    res.status(200).json({
      activeSubscriptions,
      churnRate,
      pendingRenewals,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching metrics' });
  }
};

export default getMetrics;
