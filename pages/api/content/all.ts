

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

        // Assuming coverImage is stored as a relative path, ensure the URL is correct.
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Or dynamically set
        const contentWithFullImageUrl = content.map(item => ({
            ...item,
            coverImage: item.coverImage ? `${baseUrl}${item.coverImage}` : null, // Concatenate the base URL if needed
        }));

        return res.status(200).json(contentWithFullImageUrl);
    } catch (error) {
        console.error('Error fetching content:', error);
        return res.status(500).json({ message: 'Error fetching content' });
    }
}
