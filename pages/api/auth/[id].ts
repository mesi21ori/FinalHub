// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma'; // This assumes you have Prisma initialized in a `lib/prisma.ts` file
// import { getSession } from 'next-auth/react'; // If using next-auth for authentication

// // Function to handle fetching user data based on ID
// const getUserData = async (id: number) => {
//   // Query the User model based on the provided ID
//   const user = await prisma.user.findUnique({
//     where: { id },
//     include: {
//       preferences: true, // Including related data, e.g., preferences
//       institution: true, // Include institution relation
//       subscription: true, // Include subscriptions relation
//       uploadedContent: true, // Example: uploaded content
//       reviewedContent: true, // Example: reviewed content
//       comments: true, // Example: user comments
//       notifications: true, // Example: notifications
//     },
//   });
  
//   return user;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     query: { id },
//   } = req;

//   // Assuming user ID is passed as a query parameter, e.g., /api/user/1
//   if (req.method === 'GET') {
//     try {
//       if (!id) {
//         return res.status(400).json({ message: 'User ID is required' });
//       }

//       // Fetch user information from the database using Prisma
//       const user = await getUserData(Number(id)); // Ensure the ID is a number
      
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       return res.status(200).json(user); // Respond with the user data
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     // Method not allowed for non-GET requests
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma'; // This assumes you have Prisma initialized in a `lib/prisma.ts` file

// // Function to handle fetching user data based on ID
// const getUserData = async (id: number) => {
//   // Query the User model based on the provided ID
//   const user = await prisma.user.findUnique({
//     where: { id },
//     include: {
//       preferences: true, // Including related data, e.g., preferences
//       institution: true, // Include institution relation
//       subscription: true, // Include subscriptions relation
//       uploadedContent: true, // Example: uploaded content
//       reviewedContent: true, // Example: reviewed content
//       comments: true, // Example: user comments
//       notifications: true, // Example: notifications
//     },
//   });

//   // Return the user data with password as plain text and formatted dateOfBirth
//   if (user) {
//     const formattedUser = {
//       ...user,
//       password: user.password, // Return the original password (plain text)
//       dateOfBirth: formatDate(user.dateOfBirth || ''), // Format the dateOfBirth
//       profilePicture: user.profilePicture ? `/profile${user.profilePicture}` : null, // Add profile picture path
//     };
//     return formattedUser;
//   }

//   return null;
// };

// // Function to format the dateOfBirth to "YYYY/MM/DD"
// const formatDate = (dateOfBirth: Date | string) => {
//   if (dateOfBirth instanceof Date) {
//     // Format the date in "YYYY/MM/DD" format
//     const year = dateOfBirth.getFullYear();
//     const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
//     const day = dateOfBirth.getDate().toString().padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   }

//   // If dateOfBirth is already in string format, return as is
//   return dateOfBirth;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     query: { id },
//   } = req;

//   // Assuming user ID is passed as a query parameter, e.g., /api/user/1
//   if (req.method === 'GET') {
//     try {
//       if (!id) {
//         return res.status(400).json({ message: 'User ID is required' });
//       }

//       // Fetch user information from the database using Prisma
//       const user = await getUserData(Number(id)); // Ensure the ID is a number
      
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       return res.status(200).json(user); // Respond with the user data
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     // Method not allowed for non-GET requests
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Assuming Prisma is initialized

// Function to handle fetching user data based on ID
const getUserData = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      preferences: true,
      institution: true,
      subscription: true,
      uploadedContent: true,
      reviewedContent: true,
      comments: true,
      notifications: true,
    },
  });

  if (user) {
    const formattedUser = {
      ...user,
      password: '******', // Do not return the password
      dateOfBirth: formatDate(user.dateOfBirth || ''),
      profilePicture: user.profilePicture ? `/profile${user.profilePicture}` : null,
    };
    return formattedUser;
  }

  return null;
};

// Function to format the dateOfBirth to "YYYY/MM/DD"
const formatDate = (dateOfBirth: Date | string) => {
  if (dateOfBirth instanceof Date) {
    const year = dateOfBirth.getFullYear();
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOfBirth.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  return dateOfBirth;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  // Assuming user ID is passed as a query parameter, e.g., /api/user/1
  if (req.method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await getUserData(Number(id)); // Ensure the ID is a number

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user); // Respond with the user data without password
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
