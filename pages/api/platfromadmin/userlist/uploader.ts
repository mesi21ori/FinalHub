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
//         isActive: true,
//         createdAt: true,
//         institution: {
//           select: {
//             name: true, // Fetch institution name
//           },
//         },
//         uploadedContent: {
//           select: {
//             id: true, // Selecting content ID for counting the total uploaded files
//           },
//         },
//       },
//     });

//     // Mapping the users to include the total number of uploaded files
//     const usersWithFileCount = users.map((user) => ({
//       ...user,
//       totalUploadedFiles: user.uploadedContent.length, // Counting the uploaded files
//     }));

//     res.status(200).json(usersWithFileCount); // Respond with the updated data

//   } catch (error) {
//     console.error('Error fetching users by role:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

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
        isActive: true,
        createdAt: true,
        institution: {
          select: {
            name: true, // Fetch institution name
          },
        },
        uploadedContent: {
          select: {
            id: true, // Selecting content ID for counting the total uploaded files
          },
        },
      },
    });

    // Mapping the users to include the total number of uploaded files and institution name
    const usersWithFileCount = users.map((user) => ({
      ...user,
      totalUploadedFiles: user.uploadedContent.length, // Counting the uploaded files
      name: user.institution?.name, // Handle null institution
    }));

    res.status(200).json(usersWithFileCount); // Respond with the updated data

  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
