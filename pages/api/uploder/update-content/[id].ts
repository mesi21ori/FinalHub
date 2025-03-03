// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const userId = Number((sessionStorage as Storage).getItem('userId'));

//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const contentId = Number(id);
//     if (isNaN(contentId)) {
//       return res.status(400).json({ message: 'Invalid content ID' });
//     }

//     const {
//       title,
//       description,
//       accessLevel,
//       contentType,
//       videoDetails,
//       bookDetails,
//       musicDetails,
//       articleDetails,
//       artifactDetails,
//     } = req.body;

//     // Find the existing content first, so we can keep unchanged fields intact
//     const existingContent = await prisma.content.findUnique({
//       where: { id: contentId },
//     });

//     if (!existingContent) {
//       return res.status(404).json({ message: 'Content not found' });
//     }

//     // Update the fields, leaving existing fields unchanged if not provided
//     const updatedContent = await prisma.content.update({
//       where: { id: contentId },
//       data: {
//         title: title || existingContent.title,
//         description: description || existingContent.description,
//         accessLevel: accessLevel || existingContent.accessLevel,
//         contentType: contentType || existingContent.contentType,
//         lastEditBy: userId, // Assume the admin is updating the content
//         lastEditDate: new Date(),
//       },
//     });

//     // Now, update content-specific details based on contentType
//     if (contentType === 'VIDEO' && videoDetails) {
//       await prisma.historicalVideo.update({
//         where: { id: contentId },
//         data: {
//           ...videoDetails,
//         },
//       });
//     } else if (contentType === 'BOOK' && bookDetails) {
//       await prisma.historicalBook.update({
//         where: { id: contentId },
//         data: {
//           ...bookDetails,
//         },
//       });
//     } else if (contentType === 'MUSIC' && musicDetails) {
//       await prisma.historicalMusic.update({
//         where: { id: contentId },
//         data: {
//           ...musicDetails,
//         },
//       });
//     } else if (contentType === 'ARTICLE' && articleDetails) {
//       await prisma.historicalArticle.update({
//         where: { id: contentId },
//         data: {
//           ...articleDetails,
//         },
//       });
//     } else if (contentType === 'ARTIFACT' && artifactDetails) {
//       await prisma.historicalPhoto.update({
//         where: { id: contentId },
//         data: {
//           ...artifactDetails,
//         },
//       });
//     }

//     return res.status(200).json({ updatedContent });
//   } catch (error) {
//     console.error('Error updating content:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }import { PrismaClient } from '@prisma/client';

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;  // `id` should come from the query params
  const { userId } = req.body;

  console.log('Request body:', req.body);  // Log the request body
  console.log('Request query:', req.query);

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const contentId = Number(id);

  // Validate the content ID
  if (isNaN(contentId)) {
    return res.status(400).json({ message: 'Invalid content ID' });
  }

  // Destructure only the fields that may be included in the body
  const {
    title,
    description,
    accessLevel,
    contentType,
    videoDetails,
    bookDetails,
    musicDetails,
    articleDetails,
    artifactDetails,
  } = req.body;

  try {
    // Fetch the existing content to check if it exists
    const existingContent = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Update the content with the provided data, but only the fields that are included
    const updatedContent = await prisma.content.update({
      where: { id: contentId },
      data: {
        title: title || existingContent.title,
        description: description || existingContent.description,
        accessLevel: accessLevel || existingContent.accessLevel,
        contentType: contentType || existingContent.contentType,
        lastEditBy: userId,  // Ensure the userId is set for last edit
        lastEditDate: new Date(),
      },
    });

    // Conditionally update content details based on the content type (if relevant fields are included)
    if (contentType === 'VIDEO' && videoDetails) {
      await prisma.historicalVideo.update({
        where: { id: contentId },
        data: { ...videoDetails },
      });
    } else if (contentType === 'BOOK' && bookDetails) {
      await prisma.historicalBook.update({
        where: { id: contentId },
        data: { ...bookDetails },
      });
    } else if (contentType === 'MUSIC' && musicDetails) {
      await prisma.historicalMusic.update({
        where: { id: contentId },
        data: { ...musicDetails },
      });
    } else if (contentType === 'ARTICLE' && articleDetails) {
      await prisma.historicalArticle.update({
        where: { id: contentId },
        data: { ...articleDetails },
      });
    } else if (contentType === 'ARTIFACT' && artifactDetails) {
      await prisma.historicalPhoto.update({
        where: { id: contentId },
        data: { ...artifactDetails },
      });
    }

    // Send back the updated content as a response
    return res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
