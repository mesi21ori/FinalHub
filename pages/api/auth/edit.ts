
//C:\Users\hp\Documents\code\Back\my-nextjs-prisma-project\pages\api\auth\edit.ts
import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/profile', // Directory for profile pictures
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Timestamp + original name for file
    },
  }),
});

const handler = nextConnect({
    onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
      res.status(500).end(err.toString());
    },
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
      res.status(405).end('Method Not Allowed');
    },
  });
  
  handler.use(upload.single('profilePicture')); // Middleware for file upload
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  handler.put(async (req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) => {
    const { userId, email, password, username, firstName, lastName, gender, dateOfBirth } = req.body;
    const file = req.file;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
  
    // Validate gender input
    const normalizedGender = gender ? gender.toUpperCase() : undefined;
  
    try {
      // Fetch the user to be updated
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Prepare the data to update - use existing values if not provided
      const updatedData: any = {
        email: email || user.email,
        username: username || user.username,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        gender: normalizedGender || user.gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : user.dateOfBirth,
        profilePicture: file ? `/${file.filename}` : user.profilePicture,
      };
  
      // If password is provided, hash it before updating
      if (password) {
        // Only hash if the password is different
        updatedData.password = await bcrypt.hash(password, 10);
      } else {
        // Don't change the password if not provided
        updatedData.password = user.password;
      }
  
      // Check if the email or username is being updated and validate uniqueness
      if (email && email !== user.email) {
        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ message: 'Email already exists.' });
        }
      }
  
      if (username && username !== user.username) {
        const usernameExists = await prisma.user.findUnique({ where: { username } });
        if (usernameExists) {
          return res.status(400).json({ message: 'Username already exists.' });
        }
      }
  
      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: updatedData,
      });
  
      return res.status(200).json({ message: 'Profile updated successfully.', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  
  export default handler
