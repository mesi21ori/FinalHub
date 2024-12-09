import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      title,
      description,
      fileUrl,
      accessLevel,
      category,
      publisher,
      copyrightHolder,
      language,
      subtitles,
      duration,
      publicationDate,
      preservationStatus,
      primarySource,
      eventDate,
      location,
      eventType,
      significance,
      historicalFigures,
      director,
      producer,
      cameramen,
      cinematographer,
      cast,
      relatedArtifacts,
      ageRating,
      coverImage,
      uploaderId, // Get uploaderId from the request body
      institutionId, // Get institutionId from the request body
    } = req.body;

    try {
      // Create the content entry with the correct uploader reference
      const newContent = await prisma.content.create({
        data: {
          title,
          description,
          contentType: 'VIDEO', // This is set for the VIDEO content type
          fileUrl,
          accessLevel,
          category,
          institution: { connect: { id: parseInt(institutionId, 10) } }, // Connect institution via its ID
          uploader: { connect: { id: parseInt(uploaderId, 10) } }, // Correctly reference uploader with 'connect'
          videoDetails: {
            create: {
              publisher,
              copyrightHolder,
              language,
              subtitles,
              duration,
              publicationDate: new Date(publicationDate).toISOString(), // Ensure proper date format
              preservationStatus,
              primarySource,
              eventDate: eventDate ? new Date(eventDate).toISOString() : null, // Handle optional eventDate
              location,
              eventType,
              significance,
              historicalFigures,
              director,
              producer,
              cameramen,
              cinematographer,
              cast,
              relatedArtifacts,
              ageRating,
              coverImage,
              numberOfViews: 0, // Default value
              numberOfLikes: 0, // Default value
              numberOfComments: 0, // Default value
              uploadedBy: parseInt(uploaderId, 10), // Set the uploader ID
            },
          },
        },
      });

      // Send back the newly created content
      res.status(200).json(newContent);
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Error uploading video' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
