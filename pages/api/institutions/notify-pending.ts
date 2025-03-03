
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch notifications for institutions with pending status
    const notifications = await prisma.institution.findMany({
      where: {
        registrationStatus: 'PENDING',
      },
      select: {
        id: true,
        name: true,
        emailDomain: true,
        createdAt:true,
        type:true
      },
    });

    // Format notifications to include a message
    const formattedNotifications = notifications.map((institution) => ({
      id: institution.id,
      time:institution.createdAt,
      institutionId: institution.id,
      institution:institution.name,
      type:institution.type  
    }));

    res.status(200).json(formattedNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
