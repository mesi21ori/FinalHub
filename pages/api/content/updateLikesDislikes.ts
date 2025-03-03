import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { contentId, likeStatus, dislikeStatus } = req.body;

    if (!contentId || likeStatus === undefined || dislikeStatus === undefined) {
      return res.status(400).json({ message: 'Invalid data received' });
    }

    try {
      const currentContent = await prisma.content.findUnique({
        where: { id: contentId },
        select: {
          numberOfLikes: true,
          numberOfDislikes: true,
        },
      });

      if (!currentContent) {
        return res.status(404).json({ message: 'Content not found' });
      }

      let newLikes = currentContent.numberOfLikes || 0;
      let newDislikes = currentContent.numberOfDislikes || 0;

      if (likeStatus && !dislikeStatus) {
        // Like the content
        newLikes += 1;
        if (newDislikes > 0) newDislikes -= 1; // Remove dislike if applied
      } else if (!likeStatus && dislikeStatus) {
        // Dislike the content
        newDislikes += 1;
        if (newLikes > 0) newLikes -= 1; // Remove like if applied
      } else {
        // Reset both like and dislike
        if (likeStatus === false && dislikeStatus === false) {
          if (newLikes > 0) newLikes -= 1;
          if (newDislikes > 0) newDislikes -= 1;
        }
      }

      const updatedContent = await prisma.content.update({
        where: { id: contentId },
        data: {
          numberOfLikes: newLikes,
          numberOfDislikes: newDislikes,
        },
        select: {
          numberOfLikes: true,
          numberOfDislikes: true,
        },
      });

      return res.status(200).json({
        message: 'Likes/Dislikes updated successfully',
        likes: updatedContent.numberOfLikes,
        dislikes: updatedContent.numberOfDislikes,
      });
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
      return res.status(500).json({ message: 'Error updating likes/dislikes' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
