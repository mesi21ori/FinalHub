// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { userId, preferences } = req.body;

//     if (!userId || !Array.isArray(preferences) || preferences.length === 0) {
//       return res.status(400).json({ message: 'Invalid input data.' });
//     }

//     try {
//       // Fetch the user by ID
//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//       });

//       if (!user) {
//         return res.status(404).json({ message: 'User not found.' });
//       }

//       // Fetch preference IDs by their names
//       const preferenceIds = await prisma.preference.findMany({
//         where: {
//           name: { in: preferences }, // match by names
//         },
//         select: { id: true }, // return only the IDs
//       });

//       if (preferenceIds.length === 0) {
//         return res.status(400).json({ message: 'No valid preferences found.' });
//       }

//       // Connect preferences to the user
//       const updatedUser = await prisma.user.update({
//         where: { id: userId },
//         data: {
//           preferences: {
//             set: [], // clear existing preferences
//             connect: preferenceIds.map((pref) => ({ id: pref.id })), // connect new preferences
//           },
//         },
//       });

//       return res.status(200).json({ message: 'Preferences updated successfully' });
//     } catch (error) {
//       console.error('Error updating preferences:', error);
//       return res.status(500).json({ message: 'Internal server error.' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed.' });
//   }
// }



import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, preferences } = req.body;

    if (!userId || !Array.isArray(preferences) || preferences.length === 0) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    try {
      // Fetch the user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Fetch preference IDs based on their names
      const preferenceIds = await prisma.preference.findMany({
        where: { name: { in: preferences } },
        select: { id: true },
      });

      if (preferenceIds.length === 0) {
        return res.status(400).json({ message: 'No valid preferences found.' });
      }

      // Update the user with the preference IDs as JSON array
      await prisma.user.update({
        where: { id: userId },
        data: {
          preferences: preferenceIds.map(pref => pref.id),
        },
      });

      return res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
