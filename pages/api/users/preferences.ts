import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, preferences } = req.body;

    // Ensure userId is a valid number
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    if (!Array.isArray(preferences) || preferences.length === 0) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    try {
      // Fetch the user by ID
      const user = await prisma.user.findUnique({
        where: { id: parsedUserId },
      });

      if (!user) {
        console.log('No user found for userId:', parsedUserId);
        return res.status(404).json({ message: 'User not found.' });
      }

      // Fetch preference IDs based on their names
      const preferenceRecords = await prisma.preference.findMany({
        where: { name: { in: preferences } },
      });

      if (preferenceRecords.length === 0) {
        return res.status(400).json({ message: 'No valid preferences found.' });
      }

      // Update the user with the selected preferences
      await prisma.user.update({
        where: { id: parsedUserId },
        data: {
          preferences: {
            connect: preferenceRecords.map((pref) => ({ id: pref.id })), // Establish the many-to-many relation
          },
        },
      });

      return res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
      console.error('Error in API handler:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
