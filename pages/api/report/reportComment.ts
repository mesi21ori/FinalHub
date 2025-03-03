// /pages/api/report/reportComment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { commentId, userId, reason, additionalDetails } = req.body;
  
    if (req.method === 'POST') {
      try {
        // Create a new report
        const newReport = await prisma.commentReport.create({
          data: {
            reason,
            userId,
            commentId,
            additionalDetails, // Optional field
          },
        });
  
        res.status(201).json({ message: 'Comment reported successfully', newReport });
      } catch (error: unknown) {
        // Type assertion to tell TypeScript that `error` is an instance of `Error`
        if (error instanceof Error) {
          console.error('Error while creating report:', error.message);
          res.status(500).json({ message: 'Server error', error: error.message });
        } else {
          console.error('Unknown error:', error);
          res.status(500).json({ message: 'Server error', error: 'Unknown error' });
        }
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
