import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uploadedBy } = req.query;
  if (!uploadedBy) {
    return res.status(400).json({ message: 'Uploader ID is required' });
  }

  try {
    // Fetch all videos with the detailed videoDetails fields
    const videos = await prisma.content.findMany({
      where: { contentType: 'VIDEO' ,
        ...(uploadedBy ? { uploaderId: Number(uploadedBy) } : {}), },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        eventType: true,
        isActive: true,
        numberOfViews: true,
        numberOfLikes: true,
        numberOfComments: true,
        videoDetails: {
          select: {
            alternativeTitle: true,
            language: true,
            subtitles: true,
            copyrightHolder: true,
            significance: true,
            historicalFigures: true,
            publisher: true,
            director: true,
            producer: true,
            cameraman: true,
            cinematographer: true,
            cast: true,
            eventDate: true,
            preservationStatus: true,
            source: true,
            ageRating: true,
            location: true,
            resolution: true,
            duration: true,
            relatedArticles: true,
            publicationDate: true,
            uploadedBy: true,
            reviwerBy: true,
          },
        },
      },
    });
    
    
  //  console.log('Fetched videos with video details:', videos); // Add logging to inspect the response
  console.log('Fetched videos with video details:', videos);
  return res.status(200).json({ videos });
  
    

  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

