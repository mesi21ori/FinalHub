// import nextConnect from 'next-connect';
// import multer from 'multer';
// import fs from 'fs';
// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';
// import * as Yup from 'yup';  // Import Yup for validation

// const prisma = new PrismaClient();

// // Configure Multer to store files in specific directories for video and cover image
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       let dir = '';
//       // Check for field names and assign directories for video and cover image
//       if (file.fieldname === 'videoUrl') {
//         dir = './public/uploads/HistoricalVideo'; // For video files
//       } else if (file.fieldname === 'coverImage') {
//         dir = './public/uploads/Coverimage'; // For cover image files
//       }

//       // Ensure the directory exists, create if necessary
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
//   files: { videoUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
// }

// // Set up the file upload middleware
// handler.use(upload.fields([
//   { name: 'videoUrl', maxCount: 1 },
//   { name: 'coverImage', maxCount: 1 }
// ]));

// // Helper function to ensure field is an array
// const ensureArray = (value: any) => {
//   if (Array.isArray(value)) {
//     return value;
//   } else if (value) {
//     return [value];
//   }
//   return [];
// };

// // Update validation schema
// const validationSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().required('Description is required'),
//   language: Yup.string().required('Language is required'),

//   // Array fields should be validated as arrays of strings
//   subtitles: Yup.mixed().test('is-array-or-string', 'Subtitles must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   publisher: Yup.string().required('Publisher is required'),
//   cameraman: Yup.mixed().test('is-array-or-string', 'Cameraman must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   director: Yup.mixed().test('is-array-or-string', 'Director must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   producer: Yup.mixed().test('is-array-or-string', 'Producer must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   cinematographer: Yup.mixed().test('is-array-or-string', 'Cinematographer must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   cast: Yup.mixed().test('is-array-or-string', 'Cast must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   eventType: Yup.string().required('Event Type is required'),
//   eventDate: Yup.date().required('Event Date is required'),
//   preservationStatus: Yup.string().required('Preservation Status is required'),
//   relatedArtifacts: Yup.mixed().test('is-array-or-string', 'Related Artifacts must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   source: Yup.string().required('Source is required'),
//   ageRating: Yup.string().required('Age Rating is required'),
//   location: Yup.string().required('Location is required'),

//   resolution: Yup.string().optional(),
//   duration: Yup.string().required('Duration is required'),
//   significance: Yup.string().required('Significance is required'),

//   historicalFigures: Yup.mixed().test('is-array-or-string', 'Historical Figures must be a string or an array of strings', (value) => {
//     const arrayValue = ensureArray(value);
//     return arrayValue.every((item) => typeof item === 'string');
//   }),

//   uploaderId: Yup.number().required('Uploader ID is required'),
//   institutionId: Yup.number().required('Institution ID is required'),

//   copyrightHolder: Yup.string().required('Copyright Holder is required'),

//   // Optional fields for file validation
//   videoUrl: Yup.mixed().optional(),
//   coverImage: Yup.mixed().optional(),
// });


// // POST request handler for uploading video and cover image
// handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
//   const {
//     title,
//     description,
//     alternativeTitle,
//     language,
//     subtitles,
//     publisher,
//     cameraman,
//     director,
//     producer,
//     cinematographer,
//     cast,
//     eventType,
//     eventDate,
//     preservationStatus,
//     relatedArtifacts,
//     source,
//     ageRating,
//     location,
//     resolution,
//     duration,
//     significance,
//     historicalFigures,
//     publicationDate,
//     uploaderId,
//     institutionId,
//     copyrightHolder,
//   } = req.body;

//   // Helper function to ensure an array value (if single value provided, wrap it in an array)
//   const toArray = (value: any): string[] => {
//     if (!value) return [];  // Return an empty array if the value is null or undefined
//     return Array.isArray(value) ? value : [value];  // If it's not an array, wrap it in an array
//   };

//   const validEventTypes = [
//     "WAR", "POLITICS", "RELIGION", "CULTURE", "FAMINE_CRISIS", "CIVIL_RIGHTS", "ECONOMY", 
//     "DIPLOMACY", "LEADERSHIP", "ETHNIC_MOVMENTS"
//   ];

//   const formattedEventType = eventType && validEventTypes.includes(eventType.toUpperCase())
//     ? eventType.toUpperCase()
//     : null;

//   if (!formattedEventType) {
//     return res.status(400).json({ message: "Invalid event type provided." });
//   }

//   const { videoUrl, coverImage } = req.files;

//   try {
//     console.log('Body:', req.body);  // Log the form data being received

//     // Validate form data using Yup
//     await validationSchema.validate(req.body, { abortEarly: false });

//     if (!videoUrl || !coverImage) {
//       return res.status(400).json({ message: 'Please provide both video and cover image files.' });
//     }

//     const videoFile = videoUrl && videoUrl[0];
//     const coverFile = coverImage && coverImage[0];

//     const videoPath = `/uploads/HistoricalVideo/${videoFile.filename}`;
//     const coverImagePath = `/uploads/Coverimage/${coverFile.filename}`;

//     try {
//       // Normalize array fields before saving
//       const normalizedSubtitles = toArray(subtitles);
//       const normalizedHistoricalFigures = toArray(historicalFigures);
//       const normalizedDirector = toArray(director);
//       const normalizedProducer = toArray(producer);
//       const normalizedCameraman = toArray(cameraman);
//       const normalizedCinematographer = toArray(cinematographer);
//       const normalizedCast = toArray(cast);
//       const normalizedRelatedArtifacts = toArray(relatedArtifacts);

//       // Save content to the database
//       const newContent = await prisma.content.create({
//         data: {
//           title,
//           description,
//           contentType: 'VIDEO',
//           fileUrl: videoPath,
//           accessLevel: 'PUBLIC',
//           coverImage: coverImagePath,
//           eventType: formattedEventType,  // Use the validated eventType here
//           institution: { connect: { id: parseInt(institutionId, 10) } },
//           uploader: { connect: { id: parseInt(uploaderId, 10) } },
//           videoDetails: {
//             create: {
//               alternativeTitle,
//               language,
//               significance,
//               subtitles: normalizedSubtitles,
//               copyrightHolder,
//               historicalFigures: normalizedHistoricalFigures,
//               publisher,
//               director: normalizedDirector,
//               cameraman: normalizedCameraman,
//               producer: normalizedProducer,
//               cinematographer: normalizedCinematographer,
//               cast: normalizedCast,
//               eventDate: eventDate ? new Date(eventDate).toISOString() : null,
//               preservationStatus,
//               source,
//               ageRating,
//               location,
//               // coverImage: coverImagePath,
//               resolution,
//               duration,
//               relatedArtifacts: normalizedRelatedArtifacts,
//               publicationDate: publicationDate || eventDate ? new Date(eventDate).toISOString() : "",
//               numberOfViews: 0,
//               numberOfLikes: 0,
//               numberOfComments: 0,
//               uploadedBy: parseInt(uploaderId, 10),
//               isActive: false,
//             },
//           },
//         },
//       });

//       return res.status(201).json({ message: 'Video and cover image uploaded successfully!', newContent });
//     } catch (error) {
//       console.error('Error occurred while uploading video and cover image:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } catch (validationError) {
//     if (validationError instanceof Yup.ValidationError) {
//       console.log('Validation Errors:', validationError.errors);  // Log the specific validation errors
//       return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
//     }
//     return res.status(400).json({ message: 'An unknown error occurred during validation.' });
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
import * as Yup from 'yup';  // Import Yup for validation

const prisma = new PrismaClient();

// Configure Multer to store files in specific directories for video and cover image
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = '';
      // Check for field names and assign directories for video and cover image
      if (file.fieldname === 'videoUrl') {
        dir = './public/uploads/HistoricalVideo'; // For video files
      } else if (file.fieldname === 'coverImage') {
        dir = './public/uploads/Coverimage'; // For cover image files
      }

      // Ensure the directory exists, create if necessary
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using timestamp and original filename
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

// Middleware to handle file uploads
const handler = nextConnect({
  onError: (err, req, res) => {
    const response = res as NextApiResponse;
    response.status(500).end(err.toString());
  },
  onNoMatch: (req, res) => {
    const response = res as NextApiResponse;
    response.status(405).end('Method Not Allowed');
  },
});

interface NextApiRequestWithFiles extends NextApiRequest {
  files: { videoUrl?: Express.Multer.File[]; coverImage?: Express.Multer.File[] };
}

// Set up the file upload middleware
handler.use(upload.fields([
  { name: 'videoUrl', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]));

// Helper function to ensure field is an array
const ensureArray = (value: any) => {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  }
  return [];
};

// Update validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  language: Yup.string().required('Language is required'),
  
  // Enum validation for accessLevel
  accessLevel: Yup.mixed().oneOf(['PRIVATE', 'PUBLIC', 'RESTRICTED'], 'Invalid access level').required('Access level is required'),

  // Array fields should be validated as arrays of strings
  subtitles: Yup.mixed().test('is-array-or-string', 'Subtitles must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  publisher: Yup.string().required('Publisher is required'),
  cameraman: Yup.mixed().test('is-array-or-string', 'Cameraman must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  director: Yup.mixed().test('is-array-or-string', 'Director must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  producer: Yup.mixed().test('is-array-or-string', 'Producer must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  cinematographer: Yup.mixed().test('is-array-or-string', 'Cinematographer must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  cast: Yup.mixed().test('is-array-or-string', 'Cast must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  eventType: Yup.string().required('Event Type is required'),
  eventDate: Yup.date().required('Event Date is required'),
  preservationStatus: Yup.string().required('Preservation Status is required'),
  relatedArtifacts: Yup.mixed().test('is-array-or-string', 'Related Artifacts must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  source: Yup.string().required('Source is required'),
  ageRating: Yup.string().required('Age Rating is required'),
  location: Yup.string().required('Location is required'),

  resolution: Yup.string().optional(),
  duration: Yup.string().required('Duration is required'),
  significance: Yup.string().required('Significance is required'),

  historicalFigures: Yup.mixed().test('is-array-or-string', 'Historical Figures must be a string or an array of strings', (value) => {
    const arrayValue = ensureArray(value);
    return arrayValue.every((item) => typeof item === 'string');
  }),

  uploaderId: Yup.number().required('Uploader ID is required'),
  institutionId: Yup.number().required('Institution ID is required'),

  copyrightHolder: Yup.string().required('Copyright Holder is required'),

  // Optional fields for file validation
  videoUrl: Yup.mixed().optional(),
  coverImage: Yup.mixed().optional(),
});


// POST request handler for uploading video and cover image
handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  const {
    title,
    description,
    alternativeTitle,
    language,
    subtitles,
    publisher,
    cameraman,
    director,
    producer,
    cinematographer,
    cast,
    eventType,
    eventDate,
    preservationStatus,
    relatedArtifacts,
    source,
    ageRating,
    location,
    resolution,
    duration,
    significance,
    historicalFigures,
    publicationDate,
    uploaderId,
    institutionId,
    copyrightHolder,
    accessLevel, // Add accessLevel to the body
  } = req.body;

  // Helper function to ensure an array value (if single value provided, wrap it in an array)
  const toArray = (value: any): string[] => {
    if (!value) return [];  // Return an empty array if the value is null or undefined
    return Array.isArray(value) ? value : [value];  // If it's not an array, wrap it in an array
  };

  const validEventTypes = [
    "WAR", "POLITICS", "RELIGION", "CULTURE", "FAMINE_CRISIS", "CIVIL_RIGHTS", "ECONOMY", 
    "DIPLOMACY", "LEADERSHIP", "ETHNIC_MOVMENTS"
  ];

  const formattedEventType = eventType && validEventTypes.includes(eventType.toUpperCase())
    ? eventType.toUpperCase()
    : null;

  if (!formattedEventType) {
    return res.status(400).json({ message: "Invalid event type provided." });
  }

  const { videoUrl, coverImage } = req.files;

  try {
    console.log('Body:', req.body);  // Log the form data being received

    // Validate form data using Yup
    await validationSchema.validate(req.body, { abortEarly: false });

    if (!videoUrl || !coverImage) {
      return res.status(400).json({ message: 'Please provide both video and cover image files.' });
    }

    const videoFile = videoUrl && videoUrl[0];
    const coverFile = coverImage && coverImage[0];

    const videoPath = `/uploads/HistoricalVideo/${videoFile.filename}`;
    const coverImagePath = `/uploads/Coverimage/${coverFile.filename}`;

    try {
      // Normalize array fields before saving
      const normalizedSubtitles = toArray(subtitles);
      const normalizedHistoricalFigures = toArray(historicalFigures);
      const normalizedDirector = toArray(director);
      const normalizedProducer = toArray(producer);
      const normalizedCameraman = toArray(cameraman);
      const normalizedCinematographer = toArray(cinematographer);
      const normalizedCast = toArray(cast);
      const normalizedRelatedArtifacts = toArray(relatedArtifacts);

      // Save content to the database
      const newContent = await prisma.content.create({
        data: {
          title,
          description,
          contentType: 'VIDEO',
          fileUrl: videoPath,
          accessLevel, // Store the accessLevel passed by the user
          coverImage: coverImagePath,
          eventType: formattedEventType,  // Use the validated eventType here
          institution: { connect: { id: parseInt(institutionId, 10) } },
          uploader: { connect: { id: parseInt(uploaderId, 10) } },
          videoDetails: {
            create: {
              alternativeTitle,
              language,
              significance,
              subtitles: normalizedSubtitles,
              copyrightHolder,
              historicalFigures: normalizedHistoricalFigures,
              publisher,
              director: normalizedDirector,
              cameraman: normalizedCameraman,
              producer: normalizedProducer,
              cinematographer: normalizedCinematographer,
              cast: normalizedCast,
              eventDate: eventDate ? new Date(eventDate).toISOString() : null,
              preservationStatus,
              source,
              ageRating,
              location,
              // coverImage: coverImagePath,
              resolution,
              duration,
              relatedArtifacts: normalizedRelatedArtifacts,
              publicationDate: publicationDate || eventDate ? new Date(eventDate).toISOString() : "",
              numberOfViews: 0,
              numberOfLikes: 0,
              numberOfComments: 0,
              uploadedBy: parseInt(uploaderId, 10),
              isActive: false,
            },
          },
        },
      });

      return res.status(201).json({ message: 'Video and cover image uploaded successfully!', newContent });
    } catch (error) {
      console.error('Error occurred while uploading video and cover image:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      console.log('Validation Errors:', validationError.errors);  // Log the specific validation errors
      return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
    }
    return res.status(400).json({ message: 'An unknown error occurred during validation.' });
  }
});

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
