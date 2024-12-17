// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// // Instantiate Prisma client
// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { contentId } = req.query;

//   // Ensure contentId is a number
//   if (typeof contentId !== 'string' || isNaN(Number(contentId))) {
//     return res.status(400).json({ message: 'Invalid contentId' });
//   }

//   if (req.method === 'GET') {
//     try {
//       const content = await prisma.content.findUnique({
//         where: { id: Number(contentId) },
//       });
//       if (!content) {
//         return res.status(404).json({ message: 'Content not found' });
//       }
//       res.status(200).json(content);
//     } catch (error: unknown) {
//       // Cast error to Error type
//       if (error instanceof Error) {
//         res.status(500).json({ message: 'Error fetching content' });
//         console.error('Error fetching content:', error.message);
//       } else {
//         res.status(500).json({ message: 'Unknown error occurred' });
//       }
//     }
//   } else if (req.method === 'PUT') {
//     const { title, description, contentType, accessLevel, category } = req.body;

//     // Ensure the required fields are present
//     if (!title || !description || !contentType || !accessLevel || !category) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//       const updatedContent = await prisma.content.update({
//         where: { id: Number(contentId) },
//         data: {
//           title,
//           description,
//           contentType,
//           accessLevel,
//          // category, // Updates the category
//         },
//       });
//       res.status(200).json(updatedContent);
//     } catch (error: unknown) {
//       // Cast error to Error type
//       if (error instanceof Error) {
//         res.status(500).json({ message: 'Error updating content' });
//         console.error('Error updating content:', error.message);
//       } else {
//         res.status(500).json({ message: 'Unknown error occurred' });
//       }
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // api/content/[contentId].ts
// import { PrismaClient } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   console.log("Received content ID from request:", id);

//   if (Array.isArray(id)) {
//     return res.status(400).json({ error: 'Invalid content ID' }); // Handle case where id is an array
//   }

//   if (typeof id === 'string') {
//     const parsedId = parseInt(id, 10);

//     if (isNaN(parsedId)) {
//       return res.status(400).json({ error: 'Invalid content ID' }); // Ensure the ID is a valid number
//     }

//     try {
//       const content = await prisma.content.findUnique({
//         where: { id: parsedId },  // Ensure the id is parsed to an integer
//         include: {
//           bookDetails: true,
//           videoDetails: true,
//           musicDetails: true,
//           artifactDetails: true,
//           articleDetails: true,
//         },
//       });

//       if (!content) {
//         return res.status(404).json({ error: 'Content not found' });
//       }

//       return res.status(200).json(content);
//     } catch (error) {
//       console.error("Error fetching content:", error);
//       return res.status(500).json({ error: 'Server error' });
//     }
//   }

//   return res.status(400).json({ error: 'Invalid content ID' }); // Return error if id is not a string
// }


// api/content/[contentId].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId } = req.query;  // Change `id` to `contentId`

  console.log("Received content ID from request:", contentId);

  if (typeof contentId === 'string') {
    const parsedId = parseInt(contentId, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: 'Invalid content ID' });
    }

    try {
      const content = await prisma.content.findUnique({
        where: { id: parsedId },
        include: {
          bookDetails: true,
          videoDetails: true,
          musicDetails: true,
          artifactDetails: true,
          articleDetails: true,
        },
      });

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.status(200).json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(400).json({ error: 'Invalid content ID' });
}
