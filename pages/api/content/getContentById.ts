// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     // Fetch content by ID from the database, including the details of each content type
//     const content = await prisma.content.findUnique({
//       where: {
//         id: Number(id),
//       },
//       include: {
//         uploader: true, // Include uploader info
//         bookDetails: true, // Include book-specific details
//         videoDetails: true, // Include video-specific details
//         musicDetails: true, // Include music-specific details
//         artifactDetails: true, // Include artifact-specific details
//         articleDetails: true, // Include article-specific details
//       },
//     });

//     if (!content) {
//       return res.status(404).json({ error: "Content not found" });
//     }



//     // Here we can also clean up the data before returning it (optional, depends on your needs)
//     const responseData = {
//       ...content,
//       bookDetails: content.bookDetails ? {
//         publisher: content.bookDetails.publisher,
//         author: content.bookDetails.author,
//         coAuthors: content.bookDetails.coAuthors,
//         alternativeTitle: content.bookDetails.alternativeTitle,
//         // Other book details you want to include
//       } : null,
//       videoDetails: content.videoDetails ? {
//         alternativeTitle: content.videoDetails.alternativeTitle,
//         publisher: content.videoDetails.publisher,
//         director: content.videoDetails.director,
//         producer: content.videoDetails.producer,
//         cameraman: content.videoDetails.cameraman,
//         cinematographer: content.videoDetails.cinematographer,
//         // Other video details you want to include
//       } : null,
//       musicDetails: content.musicDetails ? {
//         singer: content.musicDetails.singer,
//         composer: content.musicDetails.composer,
//         musicProducer: content.musicDetails.musicProducer,
//         melodyAuthor: content.musicDetails.melodyAuthor,
//         poemAuthor: content.musicDetails.poemAuthor,
//         instrument: content.musicDetails.instrument,
//         // Other music details you want to include
//       } : null,
//       artifactDetails: content.artifactDetails ? {
//         photoLocation: content.artifactDetails.photoLocation,
//         capturedDate: content.artifactDetails.capturedDate,
//         photographer: content.artifactDetails.photographer,
//         cameraMake: content.artifactDetails.cameraMake,
//         // Artifact-specific details
//       } : null,
//       articleDetails: content.articleDetails ? {
//         // Article-specific details
//       } : null,
    
//   numberOfLikes: content.numberOfLikes || 0,
//   numberOfDislikes: content.numberOfDislikes || 0,

//     };

    
//     res.status(200).json(responseData);
//   } catch (error) {
//     console.error("Error fetching content by ID:", error);
//     res.status(500).json({ error: "Failed to fetch content" });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Fetch content by ID from the database, including the institution details
    const content = await prisma.content.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        uploader: true, 
        bookDetails: true, 
        videoDetails: true,
        musicDetails: true, 
        artifactDetails: true, 
        articleDetails: true, 
        institution: {     
          select: {
            name: true,
            photo: true,
          },
        },
      },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Prepare the response data
    const responseData = {
      ...content,
      institution: content.institution
        ? {
            name: content.institution.name,
            photo: content.institution.photo,
          }
        : null,
      bookDetails: content.bookDetails
        ? {
            publisher: content.bookDetails.publisher,
            author: content.bookDetails.author,
            coAuthors: content.bookDetails.coAuthors,
            alternativeTitle: content.bookDetails.alternativeTitle,
          }
        : null,
      videoDetails: content.videoDetails
        ? {
            alternativeTitle: content.videoDetails.alternativeTitle,
            publisher: content.videoDetails.publisher,
            director: content.videoDetails.director,
            producer: content.videoDetails.producer,
            cameraman: content.videoDetails.cameraman,
            cinematographer: content.videoDetails.cinematographer,
          }
        : null,
      musicDetails: content.musicDetails
        ? {
            singer: content.musicDetails.singer,
            composer: content.musicDetails.composer,
            musicProducer: content.musicDetails.musicProducer,
            melodyAuthor: content.musicDetails.melodyAuthor,
            poemAuthor: content.musicDetails.poemAuthor,
            instrument: content.musicDetails.instrument,
          }
        : null,
      artifactDetails: content.artifactDetails
        ? {
            photoLocation: content.artifactDetails.photoLocation,
            capturedDate: content.artifactDetails.capturedDate,
            photographer: content.artifactDetails.photographer,
            cameraMake: content.artifactDetails.cameraMake,
          }
        : null,
      articleDetails: content.articleDetails ? {} : null,
      numberOfLikes: content.numberOfLikes || 0,
      numberOfDislikes: content.numberOfDislikes || 0,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching content by ID:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  } finally {
    await prisma.$disconnect();
  }
}
