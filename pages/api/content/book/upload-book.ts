import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Configurable directories for file uploads
const UPLOAD_DIRECTORIES = {
    music: './public/uploads/HistoricalBook',
    coverImage: './public/uploads/Coverimage',
};

// Initialize multer with custom storage settings
const upload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            let dir = '';
            if (file.fieldname === 'BookUrl') {
                dir = UPLOAD_DIRECTORIES.music;
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
    files: { BookUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
}

// Set up multer middleware
handler.use(upload.fields([
    { name: 'BookUrl', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]));

// POST route for file uploads


handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    try {
        console.log('Received files:', req.files);
        console.log('Received body:', req.body);



        const { BookUrl, coverImage } = req.files;

        if (!BookUrl || !coverImage) {
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
        const BookFile = BookUrl[0];
        const coverFile = coverImage[0];
        const bookpath = `/uploads/HistoricalBook/${BookFile.filename}`;
        const coverImagePath = `/uploads/Coverimage/${coverFile.filename}`;

        // Create new content in the database
        const newContent = await prisma.content.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                contentType: 'BOOK',
                fileUrl: bookpath,
                accessLevel: req.body.accessLevel,
                coverImage: coverImagePath,
                isActive: false,
                numberOfViews: 0,
                numberOfLikes: 0,
                numberOfComments: 0,
                eventType: formattedEventType,
                institution: { connect: { id: parseInt(req.body.institutionId, 10) } },
                uploader: { connect: { id: parseInt(req.body.uploaderId, 10) } },
                bookDetails: {
                    create: {
                        alternativeTitle: req.body.alternativeTitle,
                        language: req.body.language,
                        ISBN: req.body.ISBN,
                        author: req.body.author,
                        coAuthors: req.body.coAuthors ? req.body.coAuthors.split(',') : [],
                        editor: req.body.editor ? req.body.editor.split(',') : [],
                        numberOfPages: req.body.numberOfPages,
                        edition: req.body.edition,
                        bookType: req.body.bookType,
                        publisher: req.body.publisher,
                        significant: req.body.significant,
                        publicationDate: req.body.publicationDate ? new Date(req.body.publicationDate) : null,
                        copyrightHolder: req.body.copyrightHolder,
                        uploadedBy: parseInt(req.body.uploaderId, 10),
                    },
                },
            },
        });

        // Respond with success
        res.status(201).json({ message: 'Book and cover image uploaded successfully!', newContent });

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
