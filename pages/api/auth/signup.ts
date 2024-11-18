// // import type { NextApiRequest, NextApiResponse } from 'next'; 
// // import { PrismaClient, User, Role } from '@prisma/client'; 
// // import bcrypt from 'bcrypt';

// // const prisma = new PrismaClient();

// // interface SignupRequest { 
// //   email: string;
// //   password: string;
// //   username: string;
// //   role?: Role;       
// //   institutionId?: number;
// //   isActive?: boolean; 
// //   subscriptionId?: number;
// //   profilePicture?: string | null;  // Add this field for the profile picture
// // }

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method not allowed' });
// //   }

// //   const {
// //     email,
// //     password,
// //     username,
// //     role = Role.PUBLIC_USER, 
// //     institutionId,
// //     isActive = true,
// //     subscriptionId,
// //     profilePicture,  // Extract the profile picture field from the request body
// //   }: SignupRequest = req.body;

// //   // Basic input validation
// //   if (!email || !password || !username) {
// //     return res.status(400).json({ message: 'Email, password, and username are required' });
// //   }

// //   try {
// //     // Check if email or username already exists
// //     const existingUser = await prisma.user.findFirst({
// //       where: {
// //         OR: [
// //           { email },
// //           { username }
// //         ]
// //       }
// //     });

// //     if (existingUser) {
// //       if (existingUser.email === email) {
// //         return res.status(400).json({ message: 'Email already exists' });
// //       }
// //       if (existingUser.username === username) {
// //         return res.status(400).json({ message: 'Username already exists' });
// //       }
// //     }

// //     // Hash the password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create the new user with the profile picture handling
// //     const user = await prisma.user.create({
// //       data: {
// //         email,
// //         password: hashedPassword,
// //         username,
// //         role,
// //         institutionId,
// //         isActive,
// //         subscriptionId,
// //         profilePicture: profilePicture || null,  // Set profilePicture to null if not provided
// //       },
// //     });

// //     return res.status(201).json(user);
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // }





// import nextConnect from 'next-connect';
// import multer from 'multer';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient, Role } from '@prisma/client';
// import bcrypt from 'bcrypt';

// // Initialize Prisma Client
// const prisma = new PrismaClient();

// // Configure multer to store files on the disk
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/profile', // Set the upload destination
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Set the filename to a timestamp + original name
//     },
//   }),
// });

// // Create a handler for the API route
// const handler = nextConnect({
//   onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
//     res.status(500).end(err.toString());
//   },
//   onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
//     res.status(405).end('Method Not Allowed');
//   },
// });

// // Use multer for handling multipart/form-data
// handler.use(upload.single('profilePicture')); // Expecting the file to be sent with this field name

// // Disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser
//   },
// };

// // Define the POST request handler
// handler.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
//   const { email, password, username, role = Role.PUBLIC_USER, institutionId, isActive = true, subscriptionId } = req.body;

//   // Log the request body for debugging
//   console.log('Request Body:', req.body);

//   const file = req.file;

//   // Basic input validation
//   if (!email || !password || !username) {
//     return res.status(400).json({ message: 'Email, password, and username are required' });
//   }

//   // Handle profile picture upload
//   let profilePicture: string | null = null;
//   if (file) {
//     profilePicture = `/uploads/${file.filename}`; // Save the file path to the database
//   }

//   try {
//     // Check if email or username already exists
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [
//           { email },
//           { username }
//         ]
//       }
//     });

//     if (existingUser) {
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: 'Email already exists' });
//       }
//       if (existingUser.username === username) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         username,
//         role,
//         institutionId,
//         isActive,
//         subscriptionId,
//         profilePicture: profilePicture || null, // Save the file path or null if not provided
//       },
//     });

//     return res.status(201).json(user);
//   } catch (error) {
//     console.error('Error saving user to database:', error); // Log the error for debugging
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// export default handler;


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
    role = Role.PUBLIC_USER,
    institutionId,
    isActive = true,
    subscriptionId,
  } = req.body;

  // Log the request body for debugging
  console.log('Request Body:', req.body);

  const file = req.file;

  // Basic input validation
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required' });
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
        role,
        institutionId: parsedInstitutionId, // Use parsed institutionId
        isActive,
        subscriptionId: parsedSubscriptionId, // Use parsed subscriptionId
        profilePicture: profilePicture || null, // Save the file path or null if not provided
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error saving user to database:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;
