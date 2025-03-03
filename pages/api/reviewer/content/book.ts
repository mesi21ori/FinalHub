
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { institutionId } = req.query;

  if (!institutionId) {
    return res.status(400).json({ message: 'instituionId is required' });
  }

  try {
    const books = await prisma.content.findMany({
      where: {
        contentType: 'BOOK',
        institutionId: Number(institutionId),
        isActive:false
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        eventType: true,
        fileUrl: true,
        bookDetails: {
          select: {
            alternativeTitle: true,
            language: true,
            ISBN: true,
            author: true,
            coAuthors: true,
            editor: true,
            numberOfPages: true,
            edition: true,
            bookType: true,
            publisher: true,
            significant: true,
            publicationDate: true,
            copyrightHolder: true,
          },
        },
      },
    });

    console.log("Books fetched:", books); // Debug log

    return res.status(200).json({ books: books || [] }); // Ensure response is valid
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
