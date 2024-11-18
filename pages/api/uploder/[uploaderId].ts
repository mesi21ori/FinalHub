// pages/api/content/[uploaderId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uploaderId } = req.query;

  if (req.method === 'GET') {
    try {
      const content = await prisma.content.findMany({
        where: { uploaderId: Number(uploaderId) },
      });
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching content' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
