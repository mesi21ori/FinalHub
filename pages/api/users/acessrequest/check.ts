import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function getRequestStatus(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId, contentId } = req.query;

        // Validate that userId and contentId are provided
        if (!userId || !contentId) {
            return res.status(400).json({ error: 'User ID and Content ID are required' });
        }

        try {
            // Ensure userId and contentId are integers
            const userIdInt = parseInt(userId as string, 10);
            const contentIdInt = parseInt(contentId as string, 10);

            if (isNaN(userIdInt) || isNaN(contentIdInt)) {
                return res.status(400).json({ error: 'User ID and Content ID must be valid numbers' });
            }

            console.log('UserID:', userIdInt, 'ContentID:', contentIdInt);

            // Query the access request based on userId and contentId
            const accessRequest = await prisma.accessRequest.findFirst({
                where: {
                    userId: userIdInt,
                    contentId: contentIdInt,
                },
            });

            console.log('Access Request:', accessRequest);

            // If no access request is found, return a 404 error
            if (!accessRequest) {
                return res.status(404).json({ error: 'No access request found for the specified user and content' });
            }

            // Return the status of the access request
            res.status(200).json({ status: accessRequest.status });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
