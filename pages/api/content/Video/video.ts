
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const { id } = req.query; // Expecting a content ID to fetch a specific video
//       if (!id || Array.isArray(id)) {
//         return res.status(400).json({ message: 'Invalid ID provided' });
//       }

//       // Fetch the video details from the Content and HistoricalVideo tables
//       const content = await prisma.content.findUnique({
//         where: { id: parseInt(id, 10) },
//         include: {
//           videoDetails: true, // Include the related HistoricalVideo details
//         },
//       });

//       if (!content) {
//         return res.status(404).json({ message: 'Content not found' });
//       }

//       // Respond with the video details
//       return res.status(200).json({
//         id: content.id,
//         title: content.title,
//         description: content.description,
//         contentType: content.contentType,
//         fileUrl: content.fileUrl,
//         accessLevel: content.accessLevel,
//         eventType: content.eventType,
//         createdAt: content.createdAt,
//         updatedAt: content.updatedAt,
//         videoDetails: content.videoDetails,
//       });
//     } catch (error) {
//       console.error('Error fetching video details:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }



import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch videos from the Content table along with related HistoricalVideo by `videoDetailsId`
    const videos = await prisma.content.findMany({
      where: {
        contentType: 'VIDEO', // Filter for only video content
      },
      include: {
        // Include common content fields and related HistoricalVideo details using videoDetailsId
        videoDetails: true, // This will fetch data from HistoricalVideo model via videoDetailsId
      },
    });

    // Return the fetched data as JSON response
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}


