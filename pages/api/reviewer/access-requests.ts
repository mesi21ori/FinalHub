import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

// Set up multer for file handling
const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/resercher', // Ensure this folder exists and is accessible
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /pdf|doc|docx/;
        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOC/DOCX files are allowed.'));
        }
    },
});

// Wrap multer in nextConnect to handle file uploads in Next.js API routes
const apiRoute = nextConnect({
    onError(error, req, res: NextApiResponse) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, contentId, reason } = req.body;
    const file = (req as any).file; // Access file uploaded by multer

    // Validate request data
    if (!userId || !contentId || !reason) {
        return res.status(400).json({ error: 'User ID, content ID, and reason are required' });
    }

    try {
        // Check if file upload was successful
        const filePath = file ? `/${file.filename}` : null;

        // Create access request in the database
        const accessRequest = await prisma.accessRequest.create({
            data: {
                userId: parseInt(userId, 10),
                contentId: parseInt(contentId, 10),
                reason,
                status: 'PENDING', // Default status
                researcherFile: filePath, // Save file path if available
            },
        });

        res.status(200).json({ accessRequest });
    } catch (error) {
        console.error('Error creating access request:', error);
        res.status(500).json({ error: 'Failed to create access request' });
    }
});

export const config = {
    api: {
        bodyParser: false, // Disables body parsing to let multer handle `multipart/form-data`
    },
};

export default apiRoute;
