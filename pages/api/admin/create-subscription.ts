// import type { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Check if the request method is POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const userRole = req.headers['x-user-role']; // Retrieve user role from the header
//   if (typeof userRole !== 'string' || userRole !== 'PUBLIC_USER') {
//     return res.status(403).json({ message: 'Forbidden' }); // Check if the user has the required role
//   }

//   const { name, description, price, duration } = req.body;

//   try {
//     const newPlan = await prisma.subscriptionPlan.create({
//       data: {
//         name,
//         description,
//         price,
//         duration,
//       },
//     });

//     return res.status(201).json(newPlan);
//   } catch (error) {
//     console.error('Error creating subscription plan:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userRole = req.headers['x-user-role']; // Retrieve user role from the header
  if (typeof userRole !== 'string' || userRole !== 'PLATFORM_ADMIN') { // Change 'PUBLIC_USER' to 'PLATFORM_ADMIN'
    return res.status(403).json({ message: 'Forbidden' }); // Check if the user has the required role
  }

  const { name, features, price, duration } = req.body; // Changed 'description' to 'features'

  try {
    const newPlan = await prisma.subscriptionPlan.create({
      data: {
        name,
        features, // Use the features array here
        price,
        duration,
      },
    });

    return res.status(201).json(newPlan);
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
