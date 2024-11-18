// pages/api/institutions/content/all.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust the path according to your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const content = await prisma.content.findMany({
            include: {
                uploader: {
                    select: {
                        username: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(200).json(content);
    } catch (error) {
        console.error('Error fetching content:', error);
        return res.status(500).json({ message: 'Error fetching content' });
    }
}
