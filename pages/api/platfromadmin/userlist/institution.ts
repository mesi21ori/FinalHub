// pages/api/institutions.ts (or .js)
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const institutions = await prisma.institution.findMany({
      select: {
        id: true,
        name: true,
        photo: true,
        type: true,
        address: true,
        website: true,
        Phone: true,
        emailDomain: true,
        establishDate: true,
        collaborationPurpose: true,
        registrationStatus: true,
        createdAt: true,
        document: true,
        numberOfEmploy: true,
        content: {
          select: {
            contentType: true,
          },
        },
        users: {
          select: {
            username: true, // Get usernames of associated users
            createdAt: true,
          },
        },
      },
    });

    // Process institutions data to match the format required by the frontend
    const institutionsWithDetails = institutions.map((institution) => {
      const contentVolume = institution.content.length;  // Content volume based on count of content
      const staffCount = institution.users.length;  // Staff count based on number of associated users

      const address = institution.address as {
        country: string;
        city: string;
        street: string;
        postalCode: string;
      };

      // Find the earliest 'createdAt' date from users
      const earliestEnteringDate = institution.users.reduce((earliest, user) => {
        const userDate = new Date(user.createdAt);
        if (!earliest || userDate < earliest) {
          return userDate;
        }
        return earliest;
      }, null as Date | null);

      // Format the earliest entering date if it exists, otherwise fall back to the institution's createdAt
      const formattedEnteringDate = earliestEnteringDate ? formatDate(earliestEnteringDate) : formatDate(new Date(institution.createdAt));

      return {
        id: institution.id,
        institutionName: institution.name,
        photo: institution.photo,
        institutionType: institution.type,
        address: {
          country: address.country,
          city: address.city,
          street: address.street,
          postalCode: address.postalCode,
        },
        website: institution.website,
        phone: institution.Phone,  // Ensure field name matches Prisma schema
        email: institution.emailDomain,
        establishDate: institution.establishDate,
        collaborationPurpose: institution.collaborationPurpose,
        Status: institution.registrationStatus,
        contentType: institution.content.map(content => content.contentType),
        contentVolume,
        document: institution.document,
        staffCount,
        enteringDate: formattedEnteringDate, // Only one formatted date
        createdAt: formatDate(new Date(institution.createdAt)), // Format institution's createdAt
      };
    });

    res.status(200).json(institutionsWithDetails);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
