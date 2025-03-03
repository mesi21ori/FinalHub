import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Configurable directories for file uploads
const UPLOAD_DIRECTORIES = {
    music: './public/uploads/HistoricalMusic',
    coverImage: './public/uploads/Coverimage',
};

// Initialize multer with custom storage settings
const upload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            let dir = '';
            if (file.fieldname === 'MusicUrl') {
                dir = UPLOAD_DIRECTORIES.music;
            } else if (file.fieldname === 'coverImage') {
                dir = UPLOAD_DIRECTORIES.coverImage;
            }
            try {
                await fs.promises.mkdir(dir, { recursive: true });
                cb(null, dir);
            } catch (err) {
                cb(err as Error, ''); 
            }
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: { fileSize: 50 * 1024 * 1024 }, 
});

const handler = nextConnect({
    onError: (err, req, res: NextApiResponse) => { 
        const error = err as Error; 
        res.status(500).json({ message: error.message });
    },
    onNoMatch: (req, res: NextApiResponse) => { 
        res.status(405).json({ message: 'Method Not Allowed' });
    },
});


interface NextApiRequestWithFiles extends NextApiRequest {
    files: { MusicUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
}

handler.use(upload.fields([
    { name: 'MusicUrl', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]));




handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    try {
        console.log('Received files:', req.files);
        console.log('Received body:', req.body);



        const { MusicUrl, coverImage } = req.files;

        if (!MusicUrl || !coverImage) {
            return res.status(400).json({ message: 'Both music and cover image are required.' });

        }
       
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
        const MusicFile = MusicUrl[0];
        const coverFile = coverImage[0];
        const musicpath = `/uploads/HistoricalMusic/${MusicFile.filename}`;
        const coverImagePath = `/uploads/Coverimage/${coverFile.filename}`;

        // Create new content in the database
        const newContent = await prisma.content.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                contentType: 'MUSIC',
                fileUrl: musicpath,
                accessLevel: req.body.accessLevel,
                coverImage: coverImagePath,
                isActive: false,
                eventType: formattedEventType, // Use the formatted event type here
                institution: { connect: { id: parseInt(req.body.institutionId, 10) } },
                uploader: { connect: { id: parseInt(req.body.uploaderId, 10) } },
                numberOfViews: 0,
                numberOfLikes: 0,
                numberOfComments: 0,
                musicDetails: {
                    create: {
                        alternativeTitle: req.body.alternativeTitle,
                        language: req.body.language,
                        duration: req.body.duration,
                        composer: req.body.composer,
                        musicProducer: req.body.musicProducer,
                        musicType: req.body.musicType,
                        singer: req.body.singer,
                        additionalSinger: req.body.additionalSinger ? req.body.additionalSinger.split(',') : [],
                        melodyAuthor: req.body.melodyAuthor ? req.body.melodyAuthor.split(',') : [],
                        poemAuthor: req.body.poemAuthor ? req.body.poemAuthor.split(',') : [],
                        instrument: req.body.instrument ? req.body.instrument.split(',') : [],
                        instrumentPlayer: req.body.instrumentPlayer ? req.body.instrumentPlayer.split(',') : [],
                        audioQuality: req.body.audioQuality,
                        musicAlbum: req.body.musicAlbum,
                        musicNumber: req.body.musicNumber,
                        recorder: req.body.recorder,
                        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : null,
                        historicalFigures: req.body.historicalFigures ? req.body.historicalFigures.split(',') : [],
                        location: req.body.location,
                        significance: req.body.significance,
                        source: req.body.source,
                        publicationDate: req.body.publicationDate ? new Date(req.body.publicationDate) : null,
                        copyrightHolder: req.body.copyrightHolder,
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
