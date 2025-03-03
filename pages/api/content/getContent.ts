// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   const { id } = req.query;

// //   try {
// //     const content = await prisma.content.findUnique({
// //       where: {
// //         id: Number(id),
// //       },
// //       include: {
// //         uploader: true,
// //         bookDetails: true,
// //         videoDetails: true,
// //         musicDetails: true,
// //         artifactDetails: true,
// //         articleDetails: true,
// //       },
// //     });

// //     if (!content) {
// //       return res.status(404).json({ error: 'Content not found' });
// //     }

// //     res.status(200).json(content);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to fetch content' });
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }


// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   const { category, searchTerm } = req.query;

// //   // Validate category parameter (ensure it's one of the accepted values or "all")
// //   if (category && !["all", "book", "article", "music", "video", "photo"].includes(category as string)) {
// //     return res.status(400).json({ error: 'Invalid category' });
// //   }

// //   // Validate searchTerm (ensure it's a non-empty string if provided)
// //   if (searchTerm && typeof searchTerm !== 'string') {
// //     return res.status(400).json({ error: 'Invalid search term' });
// //   }

// //   try {
// //     // Build query conditions based on category and searchTerm
// //     const whereConditions: any = {};

// //     if (category && category !== 'all') {
// //       whereConditions.category = category;
// //     }

// //     if (searchTerm) {
// //       whereConditions.title = {
// //         contains: searchTerm as string,
// //         mode: 'insensitive', // Case-insensitive search
// //       };
// //     }

// //     // Fetch content based on conditions
// //     const content = await prisma.content.findMany({
// //       where: whereConditions,
// //       include: {
// //         uploader: true,  // Include uploader info
// //         bookDetails: true,
// //         videoDetails: true,
// //         musicDetails: true,
// //         artifactDetails: true,
// //         articleDetails: true,
// //       },
// //     });

// //     // Return the fetched content
// //     res.status(200).json(content);
// //   } catch (error) {
// //     console.error('Error fetching content:', error);
// //     res.status(500).json({ error: 'Failed to fetch content' });
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }


// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   try {
// //     // Fetch all content without any filters
// //     const content = await prisma.content.findMany({
// //       include: {
// //         uploader: true,  // Include uploader info
// //         bookDetails: true,
// //         videoDetails: true,
// //         musicDetails: true,
// //         artifactDetails: true,
// //         articleDetails: true,
// //       },
// //     });

// //     // Return the fetched content
// //     res.status(200).json(content);
// //   } catch (error) {
// //     console.error('Error fetching content:', error);
// //     res.status(500).json({ error: 'Failed to fetch content' });
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }


// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { category = "ALL", searchTerm = "" } = req.query;

//   try {
//     const filters: any = {};

//     if (category !== "ALL") {
//       filters[`${(category as string).toLowerCase()}Details`] = { isNot: null };
//     }

//     const content = await prisma.content.findMany({
//       where: {
//         ...filters,
//         title: {
//           contains: searchTerm as string,
//           mode: "insensitive",
//         },
//       },
//       include: {
//         uploader: true,
//         bookDetails: true,
//         videoDetails: true,
//         musicDetails: true,
//         artifactDetails: true,
//         articleDetails: true,
//       },
//     });

//     res.status(200).json(content);
//   } catch (error) {
//     console.error("Error fetching content:", error);
//     res.status(500).json({ error: "Failed to fetch content" });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient, ContentType } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { category = "all", searchTerm = "" } = req.query;

//   try {
//     const filters: any = {};

//     // Normalize category to match enum values
//     const normalizedCategory = category.toString().toUpperCase();

//     // Check if category is 'all' or if it's a valid ContentType
//     if (normalizedCategory !== "ALL") {
//       // If category is not 'all', check if it matches a valid ContentType enum
//       if (Object.values(ContentType).includes(normalizedCategory as ContentType)) {
//         filters.contentType = normalizedCategory as ContentType;
//       } else {
//         throw new Error("Invalid category");
//       }
//     }

//     // Fetch content from database based on filters and search term
//     const content = await prisma.content.findMany({
//       where: {
//         ...filters,
//         title: {
//           contains: searchTerm as string,
//           mode: "insensitive",
//         },
//       },
//       include: {
//         uploader: true,
//         bookDetails: true,
//         videoDetails: true,
//         musicDetails: true,
//         articleDetails: true,
//         artifactDetails: true,
//       },
//     });
    
//     // Transform content to add `secondaryInfo`
//     const transformedContent = content.map((item) => {
//       let secondaryInfo = "Unknown";
    
//       switch (item.contentType) {
//         case "BOOK":
//           secondaryInfo = item.bookDetails?.author || "Unknown Author";
//           break;
//         case "VIDEO":
//           secondaryInfo = Array.isArray(item.videoDetails?.director)
//             ? item.videoDetails.director.join(", ") || "Unknown Director"
//             : "Unknown Director";
//           break;
//         case "MUSIC":
//           secondaryInfo = item.musicDetails?.singer || "Unknown Singer";
//           break;
//         case "ARTICLE":
//           secondaryInfo = item.articleDetails?.author || "Unknown Author";
//           break;
//         case "PHOTO":
//           secondaryInfo = item.artifactDetails?.photographer || "Unknown Photographer";
//           break;
//         default:
//           secondaryInfo = "N/A";
//       }
    
//       return {
//         ...item,
//         secondaryInfo,
//       };
//     });
    
    
//     res.status(200).json(transformedContent);
    
    

//     res.status(200).json(content);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error fetching content:", error.message);
//       res.status(500).json({ error: error.message || "Failed to fetch content" });
//     } else {
//       console.error("Unknown error occurred:", error);
//       res.status(500).json({ error: "An unknown error occurred." });
//     }
//   } finally {
//     await prisma.$disconnect();
//   }
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient, ContentType } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { category = "all", searchTerm = "" } = req.query;

//   try {
//     const filters: any = {};

//     const normalizedCategory = category.toString().toUpperCase();

//     if (normalizedCategory !== "ALL") {
//       if (Object.values(ContentType).includes(normalizedCategory as ContentType)) {
//         filters.contentType = normalizedCategory as ContentType;
//       } else {
//         throw new Error("Invalid category");
//       }
//     }

//     const content = await prisma.content.findMany({
//       where: {
//         ...filters,
//         title: {
//           contains: searchTerm as string,
//           mode: "insensitive",
//         },
//       },
//       include: {
//         uploader: true,
//         bookDetails: true,
//         videoDetails: true,
//         musicDetails: true,
//         articleDetails: true,
//         artifactDetails: true,
//       },
//     });

  


//     res.status(200).json(content);
//   } catch (error) {
//     console.error("Error fetching content:", error);
//     res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error occurred." });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category = "all", searchTerm = "" } = req.query;

  try {
    const filters: any = {};

    const normalizedCategory = category.toString().toUpperCase();

    if (normalizedCategory !== "ALL") {
      if (Object.values(ContentType).includes(normalizedCategory as ContentType)) {
        filters.contentType = normalizedCategory as ContentType;
      } else {
        throw new Error("Invalid category");
      }
    }

    const content = await prisma.content.findMany({
      where: {
        ...filters,
        title: {
          contains: searchTerm as string,
          mode: "insensitive",
        },
      },
      include: {
        uploader: true,
        bookDetails: true,
        videoDetails: true,
        musicDetails: true,
        articleDetails: true,
        artifactDetails: true,
      },
    });

    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}
