import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer to store files on the disk
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/profile', // Set the upload destination
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename to a timestamp + original name
    },
  }),
});

// Create a handler for the API route
const handler = nextConnect({
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).end(err.toString());
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).end('Method Not Allowed');
  },
});

// Use multer for handling multipart/form-data
handler.use(upload.single('profilePicture')); // Expecting the file to be sent with this field name

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

// Define the POST request handler
handler.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    role = Role.PUBLIC_USER,
    institutionId,
    isActive = true,
    subscriptionId,
  } = req.body;

  const file = req.file;

  const normalizedGender = gender ? gender.toUpperCase() : undefined;
  // Basic input validation
  if (!email || !password || !username || !firstName || !lastName || !gender || !dateOfBirth ) {
    return res.status(400).json({ message: 'Email, password, username, firstName, lastName, gender, dateOfBirth' });
  }

  // Handle profile picture upload
  let profilePicture: string | null = null;
  if (file) {
    profilePicture = `/${file.filename}`; // Save the file path to the database
  }

  // Convert string fields to null if they are empty
  const parsedInstitutionId = institutionId ? Number(institutionId) : null;
  const parsedSubscriptionId = subscriptionId ? Number(subscriptionId) : null;

  try {
    // Check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
        gender:normalizedGender,
        dateOfBirth: new Date(dateOfBirth), // Convert string to Date
        role,
        institutionId: parsedInstitutionId,
        isActive,
        profilePicture: profilePicture || null,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error saving user to database:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;