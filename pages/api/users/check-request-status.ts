import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, contentId } = req.query;

    if (!userId || !contentId) {
        return res.status(400).json({ error: 'User ID and Content ID are required' });
    }

    try {
        // Find if there is an existing access request for this user and content
        const existingRequest = await prisma.accessRequest.findFirst({
            where: {
                userId: parseInt(userId as string),
                contentId: parseInt(contentId as string),
            },
        });

        if (!existingRequest) {
            // No request exists for this user and content
            return res.status(200).json({ status: 'none' });
        }

        // Return the status of the existing request
        return res.status(200).json({ status: existingRequest.status });
    } catch (error) {
        console.error("Error checking request status:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
