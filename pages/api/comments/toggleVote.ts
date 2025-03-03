//api/comments/toggleVote
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { commentId, voteType, previousVote } = req.body;

  if (!commentId || !voteType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let updateData = {};

    if (voteType === 'like') {
      // Increment likes, decrement dislikes if previously disliked
      updateData = {
        likes: { increment: 1 },
        ...(previousVote === 'dislike' && { dislikes: { decrement: 1 } }),
      };
    } else if (voteType === 'dislike') {
      // Increment dislikes, decrement likes if previously liked
      updateData = {
        dislikes: { increment: 1 },
        ...(previousVote === 'like' && { likes: { decrement: 1 } }),
      };
    } else {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: updateData,
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
