
// pages/api/institutions/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    name, 
    address, // Expecting this to be a string
    contactEmail, 
    contactPhone, 
    adminEmail,  
    adminUsername, 
    adminPassword,
    photo, // New field for institution photo
    type   // New field for institution type
  } = req.body;

  try {
    // Check if an institution with the same name or contact email already exists
    const existingInstitution = await prisma.institution.findFirst({
      where: {
        OR: [
          { name },
          { contactEmail }
        ]
      }
    });

    if (existingInstitution) {
      return res.status(400).json({         
        message: 'Institution with the same name or contact email already exists.' 
      });
    }

    // Validate the institution data
    if (!name || !address || !contactEmail || !contactPhone || !photo || !type) {
      return res.status(400).json({ message: 'Please provide all required institution details.' });
    }

    // Ensure address is a string
    if (typeof address !== 'string') {
      return res.status(400).json({ message: 'Address must be a string.' });
    }

    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with the same email already exists.' 
      });
    }

    // Validate admin data before creating the institution
    if (!adminEmail || !adminUsername || !adminPassword) {
      return res.status(400).json({ message: 'Please provide all required admin details.' });
    }

    // Create the institution
    const institution = await prisma.institution.create({
      data: {
        name,
        address,  //
        contactEmail,
        contactPhone,
        registrationStatus: 'PENDING',
        photo: typeof photo === "string" ? photo : null,
        type,  // Include type
      },
    });

    // Generate a hashed password for the admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the institution admin
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        username: adminUsername,
        password: hashedPassword,
        role: 'INSTITUTION_ADMIN',
        institutionId: institution.id,
        isActive: true,
      },
    });

    // Update the institution with the adminId
    await prisma.institution.update({
      where: { id: institution.id },
      data: { adminId: admin.id },
    });

    // Find a platform admin to notify
    const platformAdmin = await prisma.user.findFirst({
      where: { role: 'PLATFORM_ADMIN' },
    });

    if (platformAdmin) {
      // Create a notification for the platform admin
      await prisma.notification.create({
        data: {
          message: `New institution "${institution.name}" is pending approval.`,
          userId: platformAdmin.id, // Platform admin's user ID
        },
      });
    } else {
      console.warn('No platform admin found to notify.');
    }

    res.status(201).json({ institution, admin });
  } catch (error) {
    console.error(error);

    // Type guard for PrismaClientKnownRequestError
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Unique constraint failed: a user with this email already exists.' });
      }
    }

    // Handle other unknown errors
    res.status(500).json({ message: 'Internal server error' });
  }
}
