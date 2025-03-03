import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Configurable directories for file uploads
const UPLOAD_DIRECTORIES = {
  video: './public/uploads/HistoricalVideo',
  coverImage: './public/uploads/Coverimage',
};

// Initialize multer with custom storage settings
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      let dir = '';
      // Determine directory based on the file field
      if (file.fieldname === 'videoUrl') {
        dir = UPLOAD_DIRECTORIES.video;
      } else if (file.fieldname === 'coverImage') {
        dir = UPLOAD_DIRECTORIES.coverImage;
      }
      try {
        // Create directory if it doesn't exist
        await fs.promises.mkdir(dir, { recursive: true });
        cb(null, dir);
      } catch (err: unknown) {
        const error = err as Error;
        cb(error, '');
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

// Middleware setup using next-connect
const handler = nextConnect({
  onError: (err, req, res) => {
    const response = res as NextApiResponse;
    response.status(500).end(err.toString());
  },
  onNoMatch: (req, res) => {
    const response = res as NextApiResponse;
    response.status(405).end('Method Not Allowed');
  },
});

// Define request interface to handle file fields
interface NextApiRequestWithFiles extends NextApiRequest {
  files: { videoUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
}

// Set up the file upload middleware
handler.use(upload.fields([
  { name: 'videoUrl', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]));

// POST request handler for uploading video and cover image
handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  try {
    // Extract data from the request body
    const {
      title,
      description,
      alternativeTitle,
      language,
      subtitles,
      publisher,
      cameraman,
      director,
      producer,
      cinematographer,
      cast,
      eventType,
      eventDate,
      preservationStatus,
      relatedArtifacts,
      source,
      ageRating,
      location,
      resolution,
      duration,
      significance,
      historicalFigures,
      publicationDate,
      uploaderId,
      institutionId,
      copyrightHolder,
      accessLevel,
    } = req.body;


    // Validate event type
    const validEventTypes = [
      "WAR", "POLITICS", "RELIGION", "CULTURE", "FAMINE_CRISIS", "CIVIL_RIGHTS", "ECONOMY",
      "DIPLOMACY", "LEADERSHIP", "ETHNIC_MOVMENTS"
  ];
  const formattedEventType = req.body.eventType && validEventTypes.includes(req.body.eventType.toUpperCase())
      ? req.body.eventType.toUpperCase()
      : null;

  if (!formattedEventType) {
      return res.status(400).json({ message: "Invalid event type provided." });
  }


    // Retrieve files
    const { videoUrl, coverImage } = req.files;

    if (!videoUrl || !coverImage) {
      return res.status(400).json({ message: 'Both video and cover image are required.' });
    }

    const videoFile = videoUrl[0];
    const coverFile = coverImage[0];
    const videoPath = `/uploads/HistoricalVideo/${videoFile.filename}`;
    const coverImagePath = `/uploads/Coverimage/${coverFile.filename}`;

    // Continue with database operation
    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        contentType: 'VIDEO',
        fileUrl: videoPath,
        accessLevel,
        coverImage: coverImagePath,
        isActive: false,
        eventType: formattedEventType,
        numberOfViews: 0,
        numberOfLikes: 0,
        numberOfComments: 0,
        institution: { connect: { id: parseInt(institutionId, 10) } },
        uploader: { connect: { id: parseInt(uploaderId, 10) } },
        videoDetails: {
          create: {
            alternativeTitle,
            language,
            significance,
            subtitles: subtitles ? subtitles.split(',') : [],
            copyrightHolder,
            historicalFigures: historicalFigures ? historicalFigures.split(',') : [],
            publisher,
            director: director.split(','),
            cameraman: cameraman.split(','),
            producer: producer.split(','),
            cinematographer: cinematographer.split(','),
            cast: cast.split(','),
            eventDate: eventDate ? new Date(eventDate) : null,
            preservationStatus,
            source,
            ageRating,
            location,
            resolution,
            duration,
            relatedArticles: relatedArtifacts ? relatedArtifacts.split(',') : [],
            publicationDate: publicationDate ? new Date(publicationDate).toISOString() : '',
            uploadedBy: parseInt(uploaderId, 10),
          },
        },
      },
    });

    return res.status(201).json({ message: 'Video and cover image uploaded successfully!', newContent });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      // Handle any non-Error object (although unlikely)
      console.error('Unknown error occurred:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});


// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
