// // pages/api/content/edit.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'PUT') {
//         const { id, title, description, fileUrl, contentType, accessLevel, category } = req.body;

//         try {
//             const updatedContent = await prisma.content.update({
//                 where: { id: id },
//                 data: {
//                     title,
//                     description,
//                     fileUrl,
//                     contentType,
//                     accessLevel,
//                     eventType,  // Include historyCategory here
//                 },
//             });
//             return res.json(updatedContent);
//         } catch (error) {
//             console.error('Failed to update content:', error);  // Log the error for debugging
//             return res.status(500).json({ error: 'Failed to update content' });
//         }
//     }

//     res.setHeader('Allow', ['PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
// }
