import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Handler function for toggling active status and updating institution registrationStatus
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId } = req.body; // Get the userId from the request body

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      // Fetch the user by ID to ensure they exist
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          institution: true, // Also fetch the related institution data
        },
      });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Toggle the user's active status
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isActive: !user.isActive, // Toggle the isActive status
        },
      });

      // Check if the user has a related institution
      if (user.institution) {
        // Update the institution's registration status
        const updatedInstitution = await prisma.institution.update({
          where: { id: user.institution.id },
          data: {
            registrationStatus: updatedUser.isActive ? 'APPROVED' : 'REJECTED',
          },
        });

        // Return the updated user and institution information
        return res.status(200).json({
          message: 'User and institution status updated successfully',
          user: updatedUser,
          institution: updatedInstitution,
        });
      } else {
        // If no institution is associated with the user
        return res.status(400).json({ message: 'No institution associated with this user' });
      }
    } catch (error) {
      console.error('Error updating user and institution status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect(); // Disconnect Prisma client
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
