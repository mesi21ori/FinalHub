
// // pages/api/users/update.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// interface UpdateUserRequest extends NextApiRequest {
//     body: {
//         email: string;
//         username: string;
//         password?: string;
//         userId: number;  // Expecting userId to be a number
//         profilePicture?: string;
//     };
// }

// export default async function handler(req: UpdateUserRequest, res: NextApiResponse) {
//     if (req.method !== 'PUT') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const { email, username, password, userId, profilePicture } = req.body;

//     // Log the received data for debugging purposes
//     console.log('Received data:', { email, username, password, userId, profilePicture });

//     // Validate required fields
//     if (!email || !username || userId === undefined) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Ensure userId is a valid number
//     if (isNaN(Number(userId))) {
//         return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     try {
//         const updatedData: any = { email, username };

//         // Hash password if provided
//         if (password) {
//             updatedData.password = await bcrypt.hash(password, 10);
//         }

//         // Include profile picture if provided
//         if (profilePicture) {
//             updatedData.profilePicture = profilePicture;
//         }

//         const updatedUser = await prisma.user.update({
//             where: { id: Number(userId) },  // Ensure userId is a number here
//             data: updatedData,
//         });

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface UpdateUserRequest extends NextApiRequest {
    body: {
        email: string;
        username: string;
        password?: string; // Password is optional
        userId: number; // Expecting userId to be a number
        profilePicture?: string;
    };
}

export default async function handler(req: UpdateUserRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password, userId } = req.body;

    // Validate required fields
    if (!email || !username || userId === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure userId is a valid number
    if (isNaN(Number(userId))) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const existingUser = await prisma.user.findUnique({
          where: { id: Number(userId) },
          select: { password: true }  // Only select the password
      });
  
      // Ensure we found the user
      if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedData: any = { email, username };
  
      // If password is being changed (provided in plain text)
      if (password && password !== existingUser.password) {
          updatedData.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await prisma.user.update({
          where: { id: Number(userId) },
          data: updatedData,
      });
  
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
