// pages/api/subscriptions/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const updateSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, isActive } = req.body;
  
    try {
      const updatedSubscription = await prisma.userSubscription.update({
        where: { id },
        data: {
          isActive, // Ensure you're updating `isActive` or any other valid field
        },
      });
  
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ error: 'Error updating subscription' });
    }
  };
  
  export default updateSubscription;
  
