import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const subscription = await prisma.userSubscription.findFirst({
            where: {
                userId: parseInt(userId as string),
                isActive: true,
            },
        });

        if (subscription) {
            return res.status(200).json({ hasActiveSubscription: true });
        } else {
            return res.status(200).json({ hasActiveSubscription: false });
        }
    } catch (error) {
        console.error("Error checking subscription:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default handler;
