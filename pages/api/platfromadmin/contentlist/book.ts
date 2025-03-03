import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Fetch all books with detailed BookDetails fields
    const books = await prisma.content.findMany({
      where: { contentType: 'BOOK' },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        createdAt: true,
        eventType: true,
        isActive: true,
        fileUrl: true,
        numberOfViews: true,
        numberOfLikes: true,
        numberOfComments: true,
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
            uploadedBy: true,
            reviwerBy: true,
          },
        },
      },
    });

    return res.status(200).json({ books });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
