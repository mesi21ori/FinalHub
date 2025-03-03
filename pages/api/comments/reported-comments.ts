// // pages/api/comments/reported-comments.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma'; // Adjust the path if necessary

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const reportedComments = await prisma.commentReport.findMany({
//       where: {
//         resolved: false, // Example: fetching unresolved reports, adjust as necessary
//       },
//       include: {
//         comment: {
//           select: {
//             id: true,
//             text: true,
//             createdAt: true,
//             userId: true,
//             contentId: true,
//             parentId: true,
//             likes: true,
//             dislikes: true,
//             user: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//                 profilePicture: true,
//                 username: true, // Ensure the necessary fields are selected
//               },
//             },
//             content: {
//               select: {
//                 title: true,
//                 description: true,
//               },
//             },
//           },
//         },
//         user: {
//           select: {
//             username: true,
//             profilePicture: true,
//             firstName: true,
//             lastName: true,
//           },
//         },
//       },
//     });

//     // Map the data to a response structure for the frontend
//     const result = await Promise.all(reportedComments.map(async (report) => {
//       // Fetch the history (number of reports by the reporting user)
//       const historyCount = await prisma.commentReport.count({
//         where: {
//           userId: report.userId,
//         },
//       });

//       // Format the date as yyyy/mm/dd
//       const reportedOn = report.createdAt.toISOString().split('T')[0].replace(/-/g, '/');

//       return {
//         id: report.id,
//         reason: report.reason,
//         resolved: report.resolved,
//         reportedOn, // Use formatted date
//         userNotified: report.userNotified,
//         additionalDetails: report.additionalDetails,
//         comment: {
//           id: report.comment.id,
//           content: report.comment.text,
//           originalContent: report.comment.content?.description ?? 'No Content', // Fetch the original comment's content
//           reportedBy: report.user.username, // Username of the user who reported
//           reportedOn: reportedOn, // Use formatted date
//           reason: report.reason,
//           user: {
//             name: `${report.comment.user.firstName} ${report.comment.user.lastName}`,
//             profile: `/profile/${report.comment.user.username}`,
//             history: historyCount, // Number of reports by this user
//           },
//           context: {
//             postTitle: report.comment.content?.title ?? 'No Title', // Content title
//             threadDetails: 'Thread details here', // Adjust as needed
//           },
//         },
//       };
//     }));

//     return res.status(200).json(result);

//   } catch (error) {
//     console.error('Error fetching reported comments:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


// pages/api/comments/reported-comments.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reportedComments = await prisma.commentReport.findMany({
      where: {
        resolved: false, // Example: fetching unresolved reports, adjust as necessary
      },
      include: {
        comment: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            userId: true,
            contentId: true,
            parentId: true,
            likes: true,
            dislikes: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                profilePicture: true,
                username: true, // Ensure the necessary fields are selected
              },
            },
            content: {
              select: {
                title: true,
                description: true,
              },
            },
          },
        },
        user: {
          select: {
            username: true,
            profilePicture: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Map the data to a response structure for the frontend
    const result = await Promise.all(reportedComments.map(async (report) => {
      // Fetch the history (number of reports by the reporting user)
      const historyCount = await prisma.commentReport.count({
        where: {
          userId: report.comment.userId,
        },
      });

      // Format the date as yyyy/mm/dd
      const reportedOn = report.createdAt.toISOString().split('T')[0].replace(/-/g, '/');

      return {
        id: report.id,
        reason: report.reason,
        resolved: report.resolved,
        reportedOn, // Use formatted date
        userNotified: report.userNotified,
        additionalDetails: report.additionalDetails,
        comment: {
          id: report.comment.id,
          content: report.comment.text,
          originalContent: report.comment.content?.description ?? 'No Content', // Fetch the original comment's content
          reportedBy: report.user.username, // Username of the user who reported
          reportedOn: reportedOn, // Use formatted date
          reason: report.reason,
          user: {
            name: `${report.comment.user.firstName} ${report.comment.user.lastName}`,
            profile: `/profile/${report.comment.user.username}`,
            history: historyCount, // Number of reports by this user
          },
          context: {
            postTitle: report.comment.content?.title ?? 'No Title', // Content title
            threadDetails: 'Thread details here', // Adjust as needed
          },
        },
      };
    }));

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching reported comments:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
