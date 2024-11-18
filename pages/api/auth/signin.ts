// // // pages/api/auth/signin.ts  before deactive function 
// // import type { NextApiRequest, NextApiResponse } from 'next';
// // import { PrismaClient } from '@prisma/client';
// // import bcrypt from 'bcrypt';
// // import jwt from 'jsonwebtoken';

// // const prisma = new PrismaClient();

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method not allowed' });
// //   }

// //   const { username, password } = req.body;
// //   console.log('Received credentials:', { username, password });

// //   try {
// //     const user = await prisma.user.findUnique({
// //       where: { username },
// //       include: { institution: true },
// //     });

// //     console.log('User found:', user);
// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     console.log('Password valid:', isPasswordValid);

// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }
// //     if (user.role === 'INSTITUTION_ADMIN') {
// //       if (user.institutionId == null) {
// //         return res.status(400).json({ message: 'Institution ID is missing' });
// //       }

// //       const institution = await prisma.institution.findUnique({
// //         where: { id: user.institutionId as number },
// //         select: { registrationStatus: true },
// //       });

// //       if (!institution) {
// //         return res.status(404).json({ message: 'Institution not found' });
// //       }

// //       if (institution.registrationStatus === 'REJECTED') {
// //         return res.status(403).json({ message: 'Your institution has been rejected. Please contact support.' });
// //       } else if (institution.registrationStatus === 'PENDING') {
// //         return res.status(403).json({ message: 'Your institution is still under review. Please check back later.' });
// //       }
// //     }
// //     const jwtSecret = process.env.JWT_SECRET;
// //     if (!jwtSecret) {
// //       throw new Error('JWT_SECRET is not defined');
// //     }
// //     const token = jwt.sign(
// //       {
// //         id: user.id,
// //         role: user.role,
// //         fname: user.firstName,
// //         lname: user.lastName,
// //         email: user.email,
        
// //       },
// //       jwtSecret,
// //       { expiresIn: '1h' }
// //     );
// //     res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);

// //     const institutionStatus = user.institution ? user.institution.registrationStatus : null;
// //     res.status(200).json({
// //       role: user.role,
// //       institutionStatus,
// //       institutionId: user.institutionId,
// //       fname: user.firstName,
// //       lname: user.lastName,
// //       id: user.id,
// //       email: user.email,
// //     });
// //   } catch (error) {
// //     console.error('Error during sign-in:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // }    


// // pages/api/auth/signin.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { username, password } = req.body;
//   console.log('Received credentials:', { username, password });

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//       include: { institution: true },
//     });

//     console.log('User found:', user);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Check if the account is active
//     if (!user.isActive) { // Assuming your user model has an isActive field
//       return res.status(403).json({ message: 'Your account is deactivated. Please contact support.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log('Password valid:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }
    
//     if (user.role === 'INSTITUTION_ADMIN') {
//       if (user.institutionId == null) {
//         return res.status(400).json({ message: 'Institution ID is missing' });
//       }

//       const institution = await prisma.institution.findUnique({
//         where: { id: user.institutionId as number },
//         select: { registrationStatus: true },
//       });

//       if (!institution) {
//         return res.status(404).json({ message: 'Institution not found' });
//       }

//       if (institution.registrationStatus === 'REJECTED') {
//         return res.status(403).json({ message: 'Your institution has been rejected. Please contact support.' });
//       } else if (institution.registrationStatus === 'PENDING') {
//         return res.status(403).json({ message: 'Your institution is still under review. Please check back later.' });
//       }
//     }

//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       throw new Error('JWT_SECRET is not defined');
//     }
    
//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//         email: user.email,
//       },
//       jwtSecret,
//       { expiresIn: '1h' }
//     );

//     res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);

//     const institutionStatus = user.institution ? user.institution.registrationStatus : null;
//     res.status(200).json({
//       role: user.role,
//       institutionStatus,
//       institutionId: user.institutionId,
//       id: user.id,
//       email: user.email,
//       isActive: user.isActive // Include isActive in the response if needed
//     });
//   } catch (error) {
//     console.error('Error during sign-in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }



// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request is a POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  console.log('Received credentials:', { username, password });

  try {
    // Look up the user by username
    const user = await prisma.user.findUnique({
      where: { username },
      include: { institution: true },
    });

    console.log('User found:', user);

    // Handle case when user is not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the user account is active
    if (!user.isActive) { // Assuming your user model has an isActive field
      return res.status(403).json({ message: 'Your account is deactivated. Please contact support.' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Handle institution admin-specific logic
    if (user.role === 'INSTITUTION_ADMIN') {
      if (user.institutionId == null) {
        return res.status(400).json({ message: 'Institution ID is missing' });
      }

      // Fetch institution details to check registration status
      const institution = await prisma.institution.findUnique({
        where: { id: user.institutionId as number },
        select: { registrationStatus: true },
      });

      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }

      // Check institution's registration status
      if (institution.registrationStatus === 'REJECTED') {
        return res.status(403).json({ message: 'Your institution has been rejected. Please contact support.' });
      } else if (institution.registrationStatus === 'PENDING') {
        return res.status(403).json({ message: 'Your institution is still under review. Please check back later.' });
      }
    }

    // JWT Secret and Token Creation
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is missing');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Set the cookie with HttpOnly and Secure flags
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/`);

    // Define the institution status if user has an institution
    const institutionStatus = user.institution ? user.institution.registrationStatus : null;

    // Send a structured response back to the client
    res.status(200).json({
      role: user.role,
      institutionStatus,
      institutionId: user.institutionId,
      id: user.id,
      email: user.email,
      isActive: user.isActive, 
    });
  } catch (error) {
    // Log the error and return a generic message to the client
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
