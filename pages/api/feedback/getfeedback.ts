// pages/api/feedback/getfeedback.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllFeedback(req: NextApiRequest, res: NextApiResponse) {
  // Check for method type
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check user role (this example assumes you have session management)
  const userRole = req.headers['role'] // Example way to pass in role
  if (userRole !== 'PLATFORM_ADMIN') {
    return res.status(403).json({ error: 'Access denied' })
  }

  try {
    // Fetch all unresolved feedback
    const feedbacks = await prisma.feedback.findMany({
      where: { resolved: false },
      include: { user: true }, // Includes associated user information
    })

    return res.status(200).json(feedbacks)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch feedback' })
  }
}

export default getAllFeedback
