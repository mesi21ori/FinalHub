// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   // Ensure the id is a valid number
//   if (!id || isNaN(Number(id))) {
//     return res.status(400).json({ error: 'Invalid ID parameter' });
//   }

//   if (req.method === 'GET') {
//     try {
//       // Fetch data based on the institution ID
//       const institution = await prisma.institution.findUnique({
//         where: { id: Number(id) },
//       });

//       // If the institution is not found
//       if (!institution) {
//         return res.status(404).json({ error: 'Institution not found' });
//       }

//       // Return the institution data
//       res.status(200).json(institution);
//     } catch (error) {
//       // Log Prisma-specific error details if available
//       if (error instanceof Error) {
//         console.error('Error fetching institution:', error.message);
//       } else {
//         console.error('Unknown error fetching institution');
//       }

//       // Return a generic internal server error message
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     // Respond with 405 if the method is not GET
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure the id is a valid number
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }

  if (req.method === 'GET') {
    try {
      // Fetch data based on the institution ID, including the admin details
      const institution = await prisma.institution.findUnique({
        where: { id: Number(id) },
        include: {
          admin: true,  // Include admin details from the User model
        },
      });

      // If the institution is not found
      if (!institution) {
        return res.status(404).json({ error: 'Institution not found' });
      }

      // Return the institution data along with the admin details
      res.status(200).json(institution);
    } catch (error) {
      // Log Prisma-specific error details if available
      if (error instanceof Error) {
        console.error('Error fetching institution:', error.message);
      } else {
        console.error('Unknown error fetching institution');
      }

      // Return a generic internal server error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with 405 if the method is not GET
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
