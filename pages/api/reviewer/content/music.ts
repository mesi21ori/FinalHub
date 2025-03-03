import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  console.log('Received request:', req.query); 
  const { institutionId } = req.query;

  if (!institutionId) {
    return res.status(400).json({ message: "institutionId ID is required" });
  }

  try {
    // Fetch all videos with the detailed videoDetails fields
    const musics = await prisma.content.findMany({
      where: { contentType: 'MUSIC' ,
        institutionId: Number(institutionId),
        isActive:false
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        eventType: true,
        fileUrl: true,
        musicDetails: {
          select: {
            alternativeTitle: true,
            language: true,
            duration: true,
            composer: true,
            significance: true,
            historicalFigures: true,
            musicProducer: true,
            musicType: true,
            singer: true,
            additionalSinger: true,
            melodyAuthor: true,
            poemAuthor: true,
            eventDate: true,
            instrument: true,
            source: true,
            instrumentPlayer: true,
            location: true,
            audioQuality: true,
            musicAlbum: true,
            relatedArticles: true,
            publicationDate: true,
            musicNumber:true,
            recorder:true,
          },
        },
      },
    });

    return res.status(200).json({ musics });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
