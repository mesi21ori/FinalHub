import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { contentId } = req.query; // Get contentId from the query
    const userId = req.query.userId as string;

    if (!userId || !contentId) {
        return res.status(400).json({ error: 'User ID or Content ID is missing' });
    }

    const parsedUserId = parseInt(userId, 10);
    const parsedContentId = parseInt(contentId as string, 10);

    if (isNaN(parsedUserId) || isNaN(parsedContentId)) {
        return res.status(400).json({ error: 'Invalid User ID or Content ID' });
    }

    try {
        const access = await prisma.accessRequest.findFirst({
            where: {
                userId: parsedUserId,
                contentId: parsedContentId,
                status: 'APPROVED',
            },
        });

        if (access) {
            return res.status(200).json({ hasAccess: true });
        } else {
            return res.status(200).json({ hasAccess: false });
        }
    } catch (error) {
        console.error('Error checking access:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}