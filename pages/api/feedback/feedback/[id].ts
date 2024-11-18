// pages/api/feedback/feedback/[id].ts

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function resolveFeedback(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const feedbackId = Number(id)

  try {
    const updatedFeedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { resolved: true },
    })
    return res.status(200).json(updatedFeedback)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to resolve feedback' })
  }
}
