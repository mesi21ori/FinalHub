// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { contentId } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const content = await prisma.content.findUnique({
//         where: { id: Number(contentId) },
//       });
//       if (!content) {
//         return res.status(404).json({ message: 'Content not found' });
//       }
//       res.status(200).json(content);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching content' });
//       console.error('Error fetching content:', error);
//     }
//   } else if (req.method === 'PUT') {
//     const { title, description, contentType, accessLevel, category } = req.body;

//     try {
//       const updatedContent = await prisma.content.update({
//         where: { id: Number(contentId) },
//         data: { 
//           title, 
//           description, 
//           contentType, 
//           accessLevel, 
//           category // This will now update the history category
//         },
//       });
//       res.status(200).json(updatedContent);
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating content' });
//       console.error('Error updating content:', error);
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId } = req.query;

  // Ensure contentId is a number
  if (typeof contentId !== 'string' || isNaN(Number(contentId))) {
    return res.status(400).json({ message: 'Invalid contentId' });
  }

  if (req.method === 'GET') {
    try {
      const content = await prisma.content.findUnique({
        where: { id: Number(contentId) },
      });
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.status(200).json(content);
    } catch (error: unknown) {
      // Cast error to Error type
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching content' });
        console.error('Error fetching content:', error.message);
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  } else if (req.method === 'PUT') {
    const { title, description, contentType, accessLevel, category } = req.body;

    // Ensure the required fields are present
    if (!title || !description || !contentType || !accessLevel || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const updatedContent = await prisma.content.update({
        where: { id: Number(contentId) },
        data: {
          title,
          description,
          contentType,
          accessLevel,
          category, // Updates the category
        },
      });
      res.status(200).json(updatedContent);
    } catch (error: unknown) {
      // Cast error to Error type
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error updating content' });
        console.error('Error updating content:', error.message);
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
