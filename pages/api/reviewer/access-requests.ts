import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

// Set up multer for file handling
const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/researcher', // Ensure this folder exists and is accessible
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

// Use multer to handle file uploads for both 'supportingDocuments' and 'proofOfAffiliation'
apiRoute.use(upload.fields([
    { name: 'supportingDocuments', maxCount: 1 },  // Handle supportingDocuments file
    { name: 'proofOfAffiliation', maxCount: 1 },   // Handle proofOfAffiliation file
]));

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, contentId, researcherType, institutionName, positionTitle, proofOfIdentity, roleExplanation, researchTopic, purposeOfResearch, historicalContentRequested, intendedUse, phoneNumber, firstName, lastName, email, gender } = req.body;
    
    // Access files uploaded by multer
    const supportingDocuments = (req as any).files?.supportingDocuments?.[0]; 
    const proofOfAffiliation = (req as any).files?.proofOfAffiliation?.[0]; 

    if (!userId || !contentId || !supportingDocuments) {
        return res.status(400).json({ error: 'User ID, content ID, and supporting documents are required' });
    }

    try {
        // Check if file uploads were successful
        const supportingDocumentsPath = supportingDocuments ? `/uploads/researcher/${supportingDocuments.filename}` : null;
        const proofOfAffiliationPath = proofOfAffiliation ? `/uploads/researcher/${proofOfAffiliation.filename}` : null;
        
        // Create access request in the database
        const accessRequest = await prisma.accessRequest.create({
            data: {
                userId: parseInt(userId, 10),
                contentId: parseInt(contentId, 10),
                researcherType,
                institutionName,
                positionTitle,
                proofOfAffiliation: proofOfAffiliationPath, // Save file path if available
                proofOfIdentity,
                roleExplanation,
                researchTopic,
                purposeOfResearch,
                historicalContentRequested,
                intendedUse,
                supportingDocuments: supportingDocumentsPath, // Save file path if available
                phoneNumber,
                status: 'PENDING',
            },
        });

        // Update user details in the database
        const user = await prisma.user.update({
            where: { id: parseInt(userId, 10) },
            data: {
                firstName,
                lastName,
                email
            }
        });

        res.status(200).json({ accessRequest, user });
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
