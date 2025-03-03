// // // // pages/api/staff/getByInstitutionId.ts
// // // import { NextApiRequest, NextApiResponse } from 'next';
// // // import { PrismaClient } from '@prisma/client';

// // // const prisma = new PrismaClient();

// // // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// // //   if (req.method !== 'GET') {
// // //     return res.status(405).json({ message: 'Method not allowed' });
// // //   }

// // //   const { institutionId } = req.query;

// // //   if (!institutionId || Array.isArray(institutionId)) {
// // //     return res.status(400).json({ message: 'Invalid institution ID' });
// // //   }

// // //   try {
// // //     const staff = await prisma.user.findMany({
// // //       where: {
// // //         institutionId: parseInt(institutionId),
// // //       },
// // //     });

// // //     if (staff.length === 0) {
// // //       return res.status(404).json({ message: 'No staff found for this institution' });
// // //     }

// // //     res.status(200).json(staff);
// // //   } catch (error) {
// // //     console.error('Error fetching staff:', error);
// // //     res.status(500).json({ message: 'Internal server error' });
// // //   }
// // // }


// // // pages/api/staff/getByInstitutionId.ts
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'GET') {
// //     return res.status(405).json({ message: 'Method not allowed' });
// //   }

// //   const { institutionId } = req.query;

// //   if (!institutionId || Array.isArray(institutionId)) {
// //     return res.status(400).json({ message: 'Invalid institution ID' });
// //   }

// //   try {
// //     const staff = await prisma.user.findMany({
// //       where: {
// //         institutionId: parseInt(institutionId),
// //         role: {
// //             not: 'INSTITUTION_ADMIN', // Exclude staff with 'INSTITUTION_ADMIN' role
// //           },
// //       },
// //     });

// //     if (staff.length === 0) {
// //       return res.status(404).json({ message: 'No staff found for this institution' });
// //     }

// //     res.status(200).json(staff);
// //   } catch (error) {
// //     console.error('Error fetching staff:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // }


// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { institutionId } = req.query;

//   if (!institutionId || Array.isArray(institutionId)) {
//     return res.status(400).json({ message: 'Invalid institution ID' });
//   }

//   try {
//     const staff = await prisma.user.findMany({
//       where: {
//         institutionId: parseInt(institutionId),
//         role: {
//           not: 'INSTITUTION_ADMIN', // Exclude staff with 'INSTITUTION_ADMIN' role
//         },
//       },
//     });

//     if (staff.length === 0) {
//       return res.status(404).json({ message: 'No staff found for this institution' });
//     }

//     // Format 'createdAt' to 'yyyy/mm/dd' before sending the response
//     const formattedStaff = staff.map((staffMember) => ({
//       ...staffMember,
//       createdAt: staffMember.createdAt.toLocaleDateString('en-CA'), // Format as yyyy-mm-dd
//     }));

//     res.status(200).json(formattedStaff);
//   } catch (error) {
//     console.error('Error fetching staff:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { institutionId } = req.query;

  if (!institutionId || Array.isArray(institutionId)) {
    return res.status(400).json({ message: 'Invalid institution ID' });
  }

  try {
    const staff = await prisma.user.findMany({
      where: {
        institutionId: parseInt(institutionId),
        role: {
          not: 'INSTITUTION_ADMIN', // Exclude staff with 'INSTITUTION_ADMIN' role
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        createdAt: true,
        isActive: true,
        role: true,
      },
    });

    if (staff.length === 0) {
      return res.status(404).json({ message: 'No staff found for this institution' });
    }

    // Fetch content data based on role (Uploader/Reviewer)
    const staffWithContentCount = await Promise.all(staff.map(async (staffMember) => {
      let uploadedContentCount = 0;
      let reviewedContentCount = 0;

      if (staffMember.role === 'UPLOADER') {
        // Get the count of uploaded content for 'Uploader'
        uploadedContentCount = await prisma.content.count({
          where: {
            id: staffMember.id,
          },
        });
      } else if (staffMember.role === 'REVIEWER') {
        // Get the count of reviewed content for 'Reviewer'
        reviewedContentCount = await prisma.content.count({
          where: {
            id: staffMember.id, // Assuming there’s a `reviewerId` field for reviewers
          },
        });
      }

      // Format 'createdAt' to 'yyyy/mm/dd' before sending the response
      return {
        ...staffMember,
        createdAt: staffMember.createdAt.toLocaleDateString('en-CA'), // Format as yyyy-mm-dd
        uploadedContentCount, // Add uploaded content count for uploader role
        reviewedContentCount, // Add reviewed content count for reviewer role
      };
    }));

    res.status(200).json(staffWithContentCount);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
