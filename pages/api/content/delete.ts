// pages/api/content/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        try {
            await prisma.content.delete({
                where: { id: id },
            });
            return res.status(204).end(); // No content
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete content' });
        }
    }

    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
