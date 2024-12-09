
// // import nextConnect from 'next-connect';
// // import multer from 'multer';
// // import fs from 'fs';
// // import { PrismaClient } from '@prisma/client';
// // import bcrypt from 'bcrypt';
// // import { NextApiRequest, NextApiResponse } from 'next';

// // const prisma = new PrismaClient();

// // // Configure Multer to store files in specific directories
// // const upload = multer({
// //   storage: multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       let dir = '';
// //       if (file.fieldname === 'photo') {
// //         dir = './public/uploads/institutionsphoto'; // For photo files
// //       } else if (file.fieldname === 'document') {
// //         dir = './public/uploads/institutiondocument'; // For document files
// //       }

// //       // Ensure the directory exists
// //       if (!fs.existsSync(dir)) {
// //         fs.mkdirSync(dir, { recursive: true });
// //       }

// //       cb(null, dir);
// //     },
// //     filename: (req, file, cb) => {
// //       // Generate a unique filename using timestamp and original filename
// //       cb(null, Date.now() + '-' + file.originalname);
// //     },
// //   }),
// // });

// // // Middleware to handle file uploads
// // const handler = nextConnect({
// //   onError: (err, req, res) => {
// //     // Explicitly cast the response to NextApiResponse
// //     const response = res as NextApiResponse;
// //     response.status(500).end(err.toString());
// //   },
// //   onNoMatch: (req, res) => {
// //     // Explicitly cast the response to NextApiResponse
// //     const response = res as NextApiResponse;
// //     response.status(405).end('Method Not Allowed');
// //   },
// // });

// // interface NextApiRequestWithFiles extends NextApiRequest {
// //   files: { photo?: Express.Multer.File[]; document?: Express.Multer.File[] };
// // }

// // handler.use(upload.fields([
// //   { name: 'photo', maxCount: 1 },
// //   { name: 'document', maxCount: 1 }
// // ]));

// // // POST request handler
// // handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
// //   const { 
// //     name, 
// //     registrationNumber, 
// //     address, 
// //     website, 
// //     emailDomain, 
// //     collaborationPurpose, 
// //     establishDate, 
// //     numberOfEmploy, // This will come as a string
// //     Phone, 
// //     type,
// //     adminEmail, 
// //     adminFirstName, 
// //     adminLastName, 
// //     adminGender, 
// //     adminPhoneNumber, 
// //     adminUsername, 
// //     adminPassword 
// //   } = req.body;

// //   const { photo, document } = req.files;

// //   // Validate required fields
// //   if (!name || !registrationNumber || !address || !website || !emailDomain || !collaborationPurpose || !establishDate || !numberOfEmploy || !Phone || !adminEmail || !adminFirstName || !adminLastName || !adminGender || !adminPhoneNumber || !adminUsername || !adminPassword || !photo || !document ||!type) {
// //     return res.status(400).json({ message: 'Please provide all required fields.' });
// //   }

// //   // Ensure numberOfEmploy is treated as an integer
// //   const numberOfEmployParsed = parseInt(numberOfEmploy, 10);
// //   if (isNaN(numberOfEmployParsed)) {
// //     return res.status(400).json({ message: 'numberOfEmploy must be a valid number.' });
// //   }

// //   const photoPath = `/upload/institutionsphoto/${photo[0].filename}`;
// //   const documentPath = `/upload/institutiondocument/${document[0].filename}`;

// //   try {
// //     // Check if the institution with the same registration number already exists
// //     const existingInstitution = await prisma.institution.findUnique({
// //       where: { registrationNumber },
// //     });

// //     if (existingInstitution) {
// //       return res.status(400).json({ message: 'An institution with this registration number already exists.' });
// //     }

// //     // Check if a user with the same email already exists
// //     const existingUser = await prisma.user.findUnique({
// //       where: { email: adminEmail },
// //     });

// //     if (existingUser) {
// //       return res.status(400).json({ message: 'A user with this email already exists.' });
// //     }

// //     // Create the institution
// //     const institution = await prisma.institution.create({
// //       data: {
// //         name,
// //         registrationNumber,
// //         address,
// //         website,
// //         emailDomain,
// //         collaborationPurpose,
// //         establishDate,
// //         numberOfEmploy: numberOfEmployParsed, // Use the parsed integer here
// //         Phone,
// //         photo: photoPath,
// //         document: documentPath,
// //         registrationStatus: 'PENDING',
// //         createdAt: new Date(),
// //         type
// //       },
// //     });

// //     // Hash password for the institution admin
// //     const hashedPassword = await bcrypt.hash(adminPassword, 10);

// //     // Create the admin user
// //     const admin = await prisma.user.create({
// //       data: {
// //         email: adminEmail,
// //         firstName: adminFirstName,
// //         lastName: adminLastName,
// //         gender: adminGender,
// //         phoneNumber: adminPhoneNumber,
// //         username: adminUsername,
// //         password: hashedPassword,
// //         role: 'INSTITUTION_ADMIN',
// //         institutionId: institution.id,
// //         isActive: true,
// //       },
// //     });

// //     // Update institution with the adminId
// //     await prisma.institution.update({
// //       where: { id: institution.id },
// //       data: { adminId: admin.id },
// //     });

// //     return res.status(201).json({ message: 'Institution and admin created successfully!', institution, admin });
// //   } catch (error) {
// //     console.error('Error occurred while creating institution:', error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // Disable default body parser to handle file uploads
// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // export default handler;



// import nextConnect from 'next-connect';
// import multer from 'multer';
// import fs from 'fs';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// // Configure Multer to store files in specific directories
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       let dir = '';
//       if (file.fieldname === 'photo') {
//         dir = './public/uploads/institutionsphoto'; // For photo files
//       } else if (file.fieldname === 'document') {
//         dir = './public/uploads/institutiondocument'; // For document files
//       }

//       // Ensure the directory exists
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//       // Generate a unique filename using timestamp and original filename
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   }),
// });

// // Middleware to handle file uploads
// const handler = nextConnect({
//   onError: (err, req, res) => {
//     const response = res as NextApiResponse;
//     response.status(500).end(err.toString());
//   },
//   onNoMatch: (req, res) => {
//     const response = res as NextApiResponse;
//     response.status(405).end('Method Not Allowed');
//   },
// });

// interface NextApiRequestWithFiles extends NextApiRequest {
//   files: { photo?: Express.Multer.File[]; document?: Express.Multer.File[] };
// }

// handler.use(upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'document', maxCount: 1 }
// ]));

// // POST request handler
// handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
//   const { name, registrationNumber, address, website, emailDomain, collaborationPurpose, establishDate, numberOfEmploy, Phone, adminEmail, adminFirstName, adminLastName, adminGender, adminPhoneNumber, adminUsername, adminPassword, type } = req.body;
  
//   const { photo, document } = req.files;

//   // Validate required fields
//   if (!name || !registrationNumber || !address || !website || !emailDomain || !collaborationPurpose || !establishDate || !numberOfEmploy || !Phone || !adminEmail || !adminFirstName || !adminLastName || !adminGender || !adminPhoneNumber || !adminUsername || !adminPassword || !photo || !document || !type) {
//     const response = res as NextApiResponse;
//     return response.status(400).json({ message: 'Please provide all required fields.' });
//   }

//   const photoPath = `/uploads/institutionsphoto/${photo[0].filename}`;
//   const documentPath = `/uploads/institutiondocument/${document[0].filename}`;

//   try {
//     // Check if the institution with the same registration number already exists
//     const existingInstitution = await prisma.institution.findUnique({
//       where: { registrationNumber },
//     });

//     if (existingInstitution) {
//       const response = res as NextApiResponse;
//       return response.status(400).json({ message: 'An institution with this registration number already exists.' });
//     }

//     // Check if the institution with the same email domain already exists
//     const existingEmailDomain = await prisma.institution.findFirst({
//       where: { emailDomain },
//     });

//     if (existingEmailDomain) {
//       const response = res as NextApiResponse;
//       return response.status(400).json({ message: 'An institution with this email domain already exists.' });
//     }

//     // Check if the admin username already exists
//     const existingAdminUser = await prisma.user.findUnique({
//       where: { username: adminUsername },
//     });

//     if (existingAdminUser) {
//       const response = res as NextApiResponse;
//       return response.status(400).json({ message: 'An admin with this username already exists.' });
//     }

//     // Check if the admin email already exists
//     const existingAdminEmail = await prisma.user.findUnique({
//       where: { email: adminEmail },
//     });

//     if (existingAdminEmail) {
//       const response = res as NextApiResponse;
//       return response.status(400).json({ message: 'An admin with this email already exists.' });
//     }

//     // Create the institution
//     const institution = await prisma.institution.create({
//       data: {
//         name,
//         registrationNumber,
//         address,
//         website,
//         emailDomain,
//         collaborationPurpose,
//         establishDate,
//         numberOfEmploy: parseInt(numberOfEmploy), // Ensure numberOfEmploy is an integer
//         Phone,
//         photo: photoPath,
//         document: documentPath,
//         registrationStatus: 'PENDING',
//         createdAt: new Date(),
//         type, // Institution type (MUSEUM, CHURCH, etc.)
//       },
//     });

//     // Hash password for the institution admin
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     // Create the admin user
//     const admin = await prisma.user.create({
//       data: {
//         email: adminEmail,
//         firstName: adminFirstName,
//         lastName: adminLastName,
//         gender: adminGender,
//         phoneNumber: adminPhoneNumber,
//         username: adminUsername,
//         password: hashedPassword,
//         role: 'INSTITUTION_ADMIN',
//         institutionId: institution.id,
//         isActive: true,
//       },
//     });

//     // Update institution with the adminId
//     await prisma.institution.update({
//       where: { id: institution.id },
//       data: { adminId: admin.id },
//     });

//     const response = res as NextApiResponse;
//     // Send success response
//     return response.status(201).json({ message: 'Institution and admin created successfully!', institution, admin });
//   } catch (error) {
//     console.error('Error occurred while creating institution:', error);
//     const response = res as NextApiResponse;
//     response.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Disable default body parser to handle file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default handler;




import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Configure Multer for video and image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = '';
      if (file.fieldname === 'fileUrl') {
        dir = './public/uploads/HistoricalVideo'; // Video files
      } else if (file.fieldname === 'coverImage') {
        dir = './public/uploads/coverpage'; // Cover image files
      }

      // Ensure the directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using timestamp and original filename
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const handler = nextConnect({
  onError: (err, req, res) => {
    const response = res as NextApiResponse;
    response.status(500).json({ error: err.toString() });
  },
  onNoMatch: (req, res) => {
    const response = res as NextApiResponse;
    response.status(405).json({ error: 'Method Not Allowed' });
  },
});

// Extend request type to include file uploads
interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    fileUrl?: Express.Multer.File[];
    coverImage?: Express.Multer.File[];
  };
}

// Middleware to handle file uploads
handler.use(
  upload.fields([
    { name: 'fileUrl', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ])
);

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  const {
    title,
    description,
    accessLevel,
    category,
    publisher,
    copyrightHolder,
    language,
    subtitles,
    duration,
    publicationDate,
    preservationStatus,
    primarySource,
    eventDate,
    location,
    eventType,
    significance,
    historicalFigures,
    director,
    producer,
    cameramen,
    cinematographer,
    cast,
    relatedArtifacts,
    ageRating,
    uploaderId,
    institutionId,
  } = req.body;

  const { fileUrl, coverImage } = req.files;

  if (!fileUrl || !coverImage) {
    return res.status(400).json({
      error: 'Both fileUrl (video) and coverImage must be uploaded.',
    });
  }

  const fileUrlPath = `/uploads/HistoricalVideo/${fileUrl[0].filename}`;
  const coverImagePath = `/uploads/coverimage/${coverImage[0].filename}`;

  try {
    // Create the content entry with Prisma
    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        contentType: 'VIDEO',
        fileUrl: fileUrlPath, // Save video file path
       // Save cover image path
        accessLevel,
        category,
        institution: { connect: { id: parseInt(institutionId, 10) } },
        uploader: { connect: { id: parseInt(uploaderId, 10) } },
        videoDetails: {
          create: {
            publisher,
            copyrightHolder,
            language,
            subtitles,
            duration,
            publicationDate: new Date(publicationDate).toISOString(),
            preservationStatus,
            primarySource,
            eventDate: eventDate ? new Date(eventDate).toISOString() : null,
            location,
            eventType,
            significance,
            historicalFigures,
            director,
            producer,
            cameramen,
            cinematographer,
            cast,
            relatedArtifacts,
            ageRating,
            numberOfViews: 0,
            numberOfLikes: 0,
            numberOfComments: 0,
            coverImage: coverImagePath, 
            uploadedBy: parseInt(uploaderId, 10),
          },
        },
      },
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Error uploading video' });
  }
});

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
