import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function getRequestStatus(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId, contentId } = req.query;

        if (!userId || !contentId) {
            return res.status(400).json({ error: 'User ID and content ID are required' });
        }

        try {
            // Check if the user has requested access for this content
            const accessRequest = await prisma.accessRequest.findFirst({
                where: {
                    userId: parseInt(userId as string, 10),
                    contentId: parseInt(contentId as string, 10),
                },
            });

            if (!accessRequest) {
                return res.status(404).json({ error: 'No access request found for this content' });
            }

            res.status(200).json({ status: accessRequest.status });
        } catch (error) {
            console.error('Error fetching access request status:', error);
            res.status(500).json({ error: 'Failed to fetch access request status' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
