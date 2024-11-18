// // pages/api/comments.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient, Comment } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { text, userId, contentId } = req.body;

//     try {
//       const comment: Comment = await prisma.comment.create({
//         data: {
//           text,
//           userId,
//           contentId,
//         },
//       });
//       res.status(201).json(comment);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Comment creation failed' });
//     }
//   } else if (req.method === 'GET') {
//     const { contentId } = req.query;

//     try {
//       const comments: Comment[] = await prisma.comment.findMany({
//         where: { contentId: Number(contentId) },
//         include: { user: { select: { firstName: true, lastName: true } } },
//         orderBy: { createdAt: 'desc' },
//       });
//       res.status(200).json(comments);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch comments' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// // pages/api/comments.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
//  // Update the path to your prisma instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     switch (req.method) {
//         case 'GET':
//             const { contentId } = req.query;

//             try {
//                 const comments = await prisma.comment.findMany({
//                     where: { contentId: Number(contentId) }, // Ensure contentId is a number
//                     include: {
//                         user: { // Include user data
//                             select: { firstName: true, lastName: true } // Select only required fields
//                         }
//                     }
//                 });
//                 return res.status(200).json(comments);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }
//         // Handle other methods if needed
//         default:
//             return res.status(405).json({ message: 'Method not allowed' });
//     }
// }


// pages/api/comments.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Ensure you have a correct path to your prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const { contentId } = req.query;

            try {
                const comments = await prisma.comment.findMany({
                    where: { contentId: Number(contentId) }, // Ensure contentId is a number
                    include: {
                        user: { // Include user data
                            select: { username: true } // Select only required fields
                        }
                    }
                });
                return res.status(200).json(comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
        
        case 'POST': {
            const { contentId, userId, text } = req.body;

            // Check if all required fields are present
            if (!contentId || !userId || !text) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            try {
                const newComment = await prisma.comment.create({
                    data: {
                        contentId: Number(contentId), // Ensure contentId is a number
                        userId: Number(userId), // Ensure userId is a number
                        text: text, // Text of the comment
                    },
                });
                return res.status(201).json(newComment);
            } catch (error) {
                console.error('Error creating comment:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }

        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}
