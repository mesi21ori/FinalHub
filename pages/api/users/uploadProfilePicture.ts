import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import nextConnect from 'next-connect';
import multer from 'multer';

const prisma = new PrismaClient();

// Configure multer for storing images
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/profile/',
        filename: (_req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            console.error('File type not supported');
            cb(null, false); // Set false for unsupported types without passing an Error instance
        } else {
            cb(null, true);
        }
    },
});

// Set up middleware to parse form data with multer
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, _req, res) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(_req, res) {
        res.status(405).json({ error: `Method Not Allowed` });
    },
});

apiRoute.use(upload.single('profile'));

apiRoute.post(async (req, res) => {
    const userId = req.body.userId;
    const file = req.file;

    if (!userId || !file) {
        return res.status(400).json({ message: 'User ID and file are required' });
    }

    const profilePictureUrl = `/profile/${file.filename}`;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: { profilePicture: profilePictureUrl },
        });

        res.status(200).json({ profilePictureUrl });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const config = {
    api: {
        bodyParser: false, // Disable body parsing, as multer will handle it
    },
};

export default apiRoute;
