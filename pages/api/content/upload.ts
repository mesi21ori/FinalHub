// // pages/api/content/upload.ts
// import nextConnect from 'next-connect';
// import multer from 'multer';
// import prisma from '../../../lib/prisma';
// import { NextApiRequest, NextApiResponse } from 'next';

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); 
//     },
//   }),
// });

// const handler = nextConnect({
//   onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
//     res.status(500).end(err.toString());
//   },
//   onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
//     res.status(405).end('Method Not Allowed');
//   },
// });

// handler.use(upload.single('file'));

// handler.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
//   const { title, description, contentType, accessLevel, uploaderId } = req.body;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   // Validate contentType
//   const validContentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
//   if (!validContentTypes.includes(contentType)) {
//     return res.status(400).json({ message: 'Invalid content type' });
//   }

//   try {
//     const uploader = await prisma.user.findUnique({
//       where: { id: Number(uploaderId) },
//       select: { institutionId: true },
//     });

//     if (!uploader) {
//       return res.status(400).json({ message: 'Uploader not found' });
//     }

//     const { institutionId } = uploader;

//     if (!institutionId) {
//       return res.status(400).json({ message: 'Uploader has no associated institution' });
//     }

//     const newContent = await prisma.content.create({
//       data: {
//         title,
//         description,
//         contentType,
//         accessLevel,
//         uploaderId: Number(uploaderId),
//         institutionId,
//         fileUrl: `/uploads/${file.filename}`,
//         metaData: {
//           originalName: file.originalname,
//           size: file.size,
//         },
//       },
//     });

//     res.status(200).json({ message: 'File uploaded successfully', content: newContent });
//   } catch (error) {
//     res.status(500).json({ error: 'Error saving content to database' });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

// export default handler;


// pages/api/content/upload.ts
import nextConnect from 'next-connect';
import multer from 'multer';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
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
handler.use(upload.single('file'));

// Define the POST request handler
handler.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
  const { title, description, contentType, accessLevel, uploaderId, historyCategory } = req.body;

  console.log('Request Body:', req.body); // Log the request body

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Validate contentType
  const validContentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
  if (!validContentTypes.includes(contentType)) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  // Validate historyCategory
  const validCategories = ['MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY'];
  if (!validCategories.includes(historyCategory)) {
    console.log('Invalid history category received:', historyCategory); // Log invalid category for debugging
    return res.status(400).json({ message: 'Invalid history category' });
  }

  try {
    const uploader = await prisma.user.findUnique({
      where: { id: Number(uploaderId) },
      select: { institutionId: true },
    });

    if (!uploader) {
      return res.status(400).json({ message: 'Uploader not found' });
    }

    const { institutionId } = uploader;

    if (!institutionId) {
      return res.status(400).json({ message: 'Uploader has no associated institution' });
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        contentType,
        accessLevel,
        uploaderId: Number(uploaderId),
        institutionId,
        fileUrl: `/uploads/${file.filename}`,
        metaData: {
          originalName: file.originalname,
          size: file.size,
        },
        category: historyCategory,  // Use the correct field name here
      },
    });

    res.status(200).json({ message: 'File uploaded successfully', content: newContent });
  } catch (error) {
    console.error('Error saving content to database:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error saving content to database' });
  }
});


// Disable the default body parser
export const config = {
  api: {
    bodyParser: false, 
  },
};

export default handler;


