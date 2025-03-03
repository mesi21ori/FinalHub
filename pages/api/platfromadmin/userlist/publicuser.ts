// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient, Role } from '@prisma/client';

// const prisma = new PrismaClient();
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { role } = req.query;

//   if (!role || typeof role !== 'string') {
//     return res.status(400).json({ error: 'Role is required' });
//   }

//   try {
//     // Validate the role
//     const validRoles: Role[] = [
//       'PLATFORM_ADMIN',
//       'PREMIUM_USER',
//       'PUBLIC_USER',
//       'RESEARCHER_USER',
//       'INSTITUTION_ADMIN',
//       'UPLOADER',
//       'REVIEWER',
//     ];
//     if (!validRoles.includes(role as Role)) {
//       return res.status(400).json({ error: 'Invalid role' });
//     }

//     // Fetch users based on the role
//     const users = await prisma.user.findMany({
//       where: { role: role as Role },
//       select: {
//         id: true,
//         profilePicture: true,
//         email: true,
//         firstName: true,
//         lastName: true,
//         username: true,
//         gender: true,
//         dateOfBirth: true,
//         isActive: true,
//         createdAt: true,
//         preferences: {
//           select: { id: true, name: true }, // Fetch preferences as objects with id and name
//         },
//         role: true,
//       },
//     });

//     // Map user preferences to names
//     const usersWithPreferenceNames = users.map(user => ({
//       ...user,
//       preferences: user.preferences.map(pref => pref.name), // Extract preference names
//     }));

//     res.status(200).json(usersWithPreferenceNames);
//   } catch (error) {
//     console.error('Error fetching users by role:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to format date in yyyy/mm/dd format
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { role } = req.query;

  if (!role || typeof role !== 'string') {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    // Validate the role
    const validRoles: Role[] = [
      'PLATFORM_ADMIN',
      'PREMIUM_USER',
      'PUBLIC_USER',
      'RESEARCHER_USER',
      'INSTITUTION_ADMIN',
      'UPLOADER',
      'REVIEWER',
    ];
    if (!validRoles.includes(role as Role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Fetch users based on the role
    const users = await prisma.user.findMany({
      where: { role: role as Role },
      select: {
        id: true,
        profilePicture: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        gender: true,
        dateOfBirth: true,
        isActive: true,
        createdAt: true,
        preferences: {
          select: { id: true, name: true }, // Fetch preferences as objects with id and name
        },
        role: true,
      },
    });

    // Mapping the users to include formatted dates and preferences
    const usersWithFormattedData = users.map(user => ({
      ...user,
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : null, // Format dateOfBirth if it exists
      createdAt: formatDate(user.createdAt), // Format createdAt field
      preferences: user.preferences.map(pref => pref.name), // Extract preference names
    }));

    res.status(200).json(usersWithFormattedData);
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
