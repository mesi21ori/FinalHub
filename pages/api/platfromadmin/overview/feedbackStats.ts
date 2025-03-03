import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FeedbackStatsResponse {
  totalFeedback: number;
  feedbackByType: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedbackStatsResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { year } = req.body;

    if (!year || typeof year !== "number") {
      return res.status(400).json({ error: "Invalid year provided" });
    }

    // Define the start and end of the year
    const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00Z`);

    // Fetch all feedbacks for the specified year
    const feedbacks = await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
    });

    // Initialize counters for different types of feedback
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    // Classify feedbacks based on the rating
    feedbacks.forEach((feedback) => {
      if (feedback.rating === 1 || feedback.rating === 2) {
        negative++;
      } else if (feedback.rating === 3) {
        neutral++;
      } else if (feedback.rating === 4 || feedback.rating === 5) {
        positive++;
      }
    });

    const totalFeedback = positive + neutral + negative;

    res.status(200).json({
      totalFeedback,
      feedbackByType: {
        positive,
        neutral,
        negative,
      },
    });
  } catch (error) {
    console.error("Error fetching feedback stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
