import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Configurable directories for file uploads
const UPLOAD_DIRECTORIES = {
    photo: './public/uploads/HistoricalPhoto',
    coverImage: './public/uploads/Coverimage',
};

// Initialize multer with custom storage settings
const upload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            let dir = '';
            if (file.fieldname === 'PhotoUrl') {
                dir = UPLOAD_DIRECTORIES.photo;
            } else if (file.fieldname === 'coverImage') {
                dir = UPLOAD_DIRECTORIES.coverImage;
            }
            try {
                await fs.promises.mkdir(dir, { recursive: true });
                cb(null, dir);
            } catch (err) {
                cb(err as Error, ''); // Type assertion for 'Error'
            }
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

const handler = nextConnect({
    onError: (err, req, res: NextApiResponse) => { // Cast to NextApiResponse
        const error = err as Error; // Type assertion
        res.status(500).json({ message: error.message });
    },
    onNoMatch: (req, res: NextApiResponse) => { // Cast to NextApiResponse
        res.status(405).json({ message: 'Method Not Allowed' });
    },
});

// Extend Next.js request type to handle files
interface NextApiRequestWithFiles extends NextApiRequest {
    files: { PhotoUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
}

// Set up multer middleware
handler.use(upload.fields([
    { name: 'PhotoUrl', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]));

// POST route for file uploads


handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    try {
        console.log('Received files:', req.files);
        console.log('Received body:', req.body);



        const { PhotoUrl } = req.files;

        if (!PhotoUrl ) {
            return res.status(400).json({ message: 'Both music and cover image are required.' });

        }
        // Define and format event type
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

        // Continue processing the files
        const PhotoFile = PhotoUrl[0];
       
        const Photopath = `/uploads/HistoricalPhoto/${PhotoFile.filename}`;
      
        // Create new content in the database
        const newContent = await prisma.content.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                contentType: 'PHOTO',
                fileUrl: Photopath,
                accessLevel: req.body.accessLevel,
                isActive: false,
                eventType: formattedEventType, 
                numberOfViews: 0,
                numberOfLikes: 0,
                numberOfComments: 0,
                institution: { connect: { id: parseInt(req.body.institutionId, 10) } },
                uploader: { connect: { id: parseInt(req.body.uploaderId, 10) } },
                artifactDetails: {
                    create: {      
                        format: req.body.format,
                        resolution: req.body.resolution,
                        aspectRatio: req.body.aspectRatio,
                        photoLocation: req.body.photoLocation,
                        capturedDate: req.body.capturedDate ? new Date(req.body.capturedDate) : null,
                        photographer: req.body.photographer,
                        cameraMake: req.body.cameraMake ,
                        cameraModel: req.body.cameraModel, 
                        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : null,
                        historicalFigures: req.body.historicalFigures ? req.body.historicalFigures.split(',') : [],
                        significance: req.body.significance,
                        relatedArticles: req.body.relatedArticles ? req.body.relatedArticles.split(',') : [],
                        uploadedBy: parseInt(req.body.uploaderId, 10),
                    },
                },
            },
        });

        // Respond with success
        res.status(201).json({ message: 'Video and cover image uploaded successfully!', newContent });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error occurred:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            console.error('Unknown error occurred:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});



export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
