// /pages/api/users/[id]/preferences.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Ensure the ID is valid and is a number
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    try {
        console.log('User ID:', id);
        // Fetch the user and preferences from the database
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: { preferences: true },
        });
        console.log('User:', user);
        // Check if user exists and preferences are not null or undefined
        if (!user || !user.preferences) {
            return res.status(404).json({ message: 'User not found or preferences not set' });
        }
        if (!user || user.preferences === null) {
            return res.status(404).json({ message: 'User preferences not set' });
        }
        

        // Type cast user.preferences to number[] explicitly
        const preferences: number[] = Array.isArray(user.preferences)
            ? (user.preferences as number[]).filter((pref: any) => typeof pref === 'number' && pref !== null && !isNaN(pref))
            : [];

        // If no valid preferences, return an appropriate message
        if (preferences.length === 0) {
            return res.status(404).json({ message: 'No valid preferences found' });
        }

        // Fetch preferences data from the Preference table based on the IDs in the preferences array
        const preferencesData = await prisma.preference.findMany({
            where: {
                id: { in: preferences }, // Get preferences based on the array of IDs
            },
        });

        // Return the preference data to the client
        return res.status(200).json({ preferences: preferencesData });
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        return res.status(500).json({ message: 'Error fetching preferences' });
    }
}
