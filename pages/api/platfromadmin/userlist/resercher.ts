// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient, Role } from '@prisma/client';

// const prisma = new PrismaClient();

// // Helper function to format date in yyyy/mm/dd format
// const formatDate = (date: Date): string => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}/${month}/${day}`;
// };

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
//         researchRequests: {
//           select: {
//             positionTitle: true,
//             proofOfAffiliation: true,
//             roleExplanation: true,
//             proofOfIdentity: true,
//             researcherType: true,
//             purposeOfResearch: true,
//             historicalContentRequested: true,
//             intendedUse: true,
//             supportingDocuments: true,
//           },
//         },
//         role: true,
//       },
//     });

//     // Mapping the users to include formatted dates and preferences


//     res.status(200).json(users);
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
        researchRequests: {
          select: {
            positionTitle: true,
            proofOfAffiliation: true,
            roleExplanation: true,
            proofOfIdentity: true,
            researcherType: true,
            purposeOfResearch: true,
            historicalContentRequested: true,
            intendedUse: true,
            supportingDocuments: true,
          },
        },
        role: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
