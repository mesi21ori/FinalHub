// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// type Data = {
//   accessRequests: any[];
//   error?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ accessRequests: [], error: 'Method Not Allowed' });
//   }

//   try {
//     // Get the institutionId from the request body
//     const { institutionId } = req.body;

//     if (!institutionId) {
//       return res.status(400).json({ accessRequests: [], error: "Institution ID is missing in request body" });
//     }

//     // Fetch the AccessRequests where the status is PENDING and the content institutionId matches the session institutionId
//     const accessRequests = await prisma.accessRequest.findMany({
//       where: {
//         status: 'PENDING',  // Only PENDING status
//         content: {
//           institutionId: parseInt(institutionId, 10), // Match institutionId in Content table
//         },
//       },
//       include: {
//         content: true, // Include the content to check the associated institutionId
//         researcher: true, // You can include other related models if necessary
//       },
//     });
    

//     // Send the response with the fetched data
//     return res.status(200).json({ accessRequests });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ accessRequests: [], error: "Failed to fetch access requests" });
//   }
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// type Data = {
//   accessRequests: any[];
//   error?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ accessRequests: [], error: 'Method Not Allowed' });
//   }

//   try {
//     const { institutionId } = req.body;

//     if (!institutionId) {
//       return res.status(400).json({ accessRequests: [], error: "Institution ID is missing in request body" });
//     }

//     // Fetch the AccessRequests and related User data (researcher)
//     const accessRequests = await prisma.accessRequest.findMany({
//       where: {
//         status: 'PENDING', // Only PENDING status
//         content: {
//           institutionId: parseInt(institutionId, 10),
//                   },
//       },
//       include: {
//         content: true, // Include the content to check the associated institutionId
//         researcher: {  // Include the user (researcher) data related to the access request
//           select: {
//             id: true,       // User's ID
//             firstName: true, // First Name
//             lastName: true,  // Last Name
//             username: true,  // Username
//             email: true,     // Email (if needed)
//           },
//         },
//       },
//     });

//     // Send the response with the fetched data
//     return res.status(200).json({ accessRequests });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ accessRequests: [], error: "Failed to fetch access requests" });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

type Data = {
  accessRequests: any[];
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ accessRequests: [], error: 'Method Not Allowed' });
  }

  try {
    const { institutionId } = req.body;

    if (!institutionId) {
      return res.status(400).json({ accessRequests: [], error: "Institution ID is missing in request body" });
    }

    
    const accessRequests = await prisma.accessRequest.findMany({
      where: {
        status: 'PENDING', 
        content: {
          institutionId: parseInt(institutionId, 10),
        },
      },
      include: {
        content: true, 
        researcher: {  
          select: {
            id: true,      
            firstName: true, 
            lastName: true, 
            username: true,  
            email: true,     
          },
        },
      },
    });

   
    const formattedAccessRequests = accessRequests.map((request) => {
      const formattedRequest = { ...request };

     
      if (formattedRequest.createdAt) {
        formattedRequest.createdAt = new Date(formattedRequest.createdAt).toLocaleString() as unknown as Date; // Format date
      }

      return formattedRequest;
    });


    return res.status(200).json({ accessRequests: formattedAccessRequests });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ accessRequests: [], error: "Failed to fetch access requests" });
  }
}
