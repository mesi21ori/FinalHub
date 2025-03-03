import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Validate user ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    try {
        console.log('Fetching preferences for user ID:', id);

        // Fetch user preferences
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: { preferences: true },
        });

        if (!user?.preferences) {
            return res.status(404).json({ message: 'User not found or preferences not set' });
        }

        // Extract and validate preference IDs
        const preferences = Array.isArray(user.preferences)
            ? user.preferences.map(pref => pref.id).filter(id => typeof id === 'number')
            : [];

        if (preferences.length === 0) {
            return res.status(404).json({ message: 'No valid preferences found' });
        }

        // Fetch preferences data
        const preferencesData = await prisma.preference.findMany({
            where: { id: { in: preferences } },
        });

        return res.status(200).json({ preferences: preferencesData });
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        return res.status(500).json({ message: 'Error fetching preferences' });
    }
}
