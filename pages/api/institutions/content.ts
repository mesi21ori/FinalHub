// // pages/api/institution/content.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         const { institutionId } = req.query;

//         if (!institutionId) {
//             return res.status(400).json({ message: 'Institution ID is required.' });
//         }

//         try {
//             const contentList = await prisma.content.findMany({
//                 where: {
//                     institutionId: Number(institutionId),
//                 },
//                 include: {
//                     uploader: {
//                         select: { firstName: true, lastName: true, email: true },
//                     },
//                 },
//             });

//             return res.status(200).json(contentList);
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'An error occurred while fetching content.' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET']);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
// pages/api/institutions/content.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query;

  if (!institutionId) {
    return res.status(400).json({ message: 'Institution ID is required' });
  }

  try {
    const content = await prisma.content.findMany({
      where: {
        institutionId: Number(institutionId),
      },
      include: {
        uploader: {
          select: {
            username:true, 
            email:true,
          },
        },
      },
    });

    return res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ message: 'Error fetching content' });
  }
}
