// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { parentId, userId, text } = req.body;

//   if (req.method === 'POST') {
//     // Validate that all required fields are present
//     if (!parentId || !userId || !text?.trim()) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//       // Fetch the contentId from the parent comment
//       const parentComment = await prisma.comment.findUnique({
//         where: { id: parentId },
//       });

//       if (!parentComment) {
//         return res.status(404).json({ message: 'Parent comment not found' });
//       }

//       // Create a reply as a new comment
//       const reply = await prisma.comment.create({
//         data: {
//           text,
//           userId,
//           contentId: parentComment.contentId, // Use the original contentId
//           parentId, // Linking it to the parent comment
//         },
//       });

//       // Return the created reply
//       res.status(201).json(reply);
//     } catch (error: unknown) { // Explicitly set error type to `unknown`
//       if (error instanceof Error) {
//         console.error('Error creating reply:', error.message); // Use error.message if it's an instance of Error
//         res.status(500).json({ message: 'Server error', error: error.message });
//       } else {
//         // Handle case where error is not an instance of Error
//         console.error('Unexpected error:', error);
//         res.status(500).json({ message: 'Unexpected error', error: 'Unknown error occurred' });
//       }
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { parentId, userId, text } = req.body;

  if (req.method === 'POST') {
    // Validate that all required fields are present
    if (!parentId || !userId || !text?.trim()) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Fetch the contentId from the parent comment
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }

      // Create a reply as a new comment
      const reply = await prisma.comment.create({
        data: {
          text,
          userId,
          contentId: parentComment.contentId, // Use the original contentId
          parentId, // Linking it to the parent comment
        },
        include: {
          user: true, // Include the related user data
        },
      });

      // Return the created reply with user details
      res.status(201).json(reply);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating reply:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error: 'Unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
