import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IncomeStatsResponse {
  monthlyIncomeStats: { month: string; totalIncome: number }[];
  totalIncome: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IncomeStatsResponse | { error: string }>
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

    // Fetch all subscriptions for the specified year
    const subscriptions = await prisma.userSubscription.findMany({
      where: {
        startDate: {
          gte: startOfYear,
        },
        endDate: {
          lt: endOfYear,
        },
      },
      include: {
        plan: true, // Include the subscription plan to access the price
      },
    });

    // Calculate the total income from subscriptions
    const totalIncome = subscriptions.reduce((total, subscription) => {
      return total + subscription.plan.price;
    }, 0);

    // Divide the total income by months
    const monthlyIncomeStats = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 1);

      const incomeForMonth = subscriptions.reduce((total, subscription) => {
        const startDate = new Date(subscription.startDate);
        const endDate = new Date(subscription.endDate);

        // Check if the subscription is active in this month
        if (
          (startDate <= monthEnd && endDate >= monthStart) ||
          (startDate <= monthEnd && endDate >= monthStart)
        ) {
          return total + subscription.plan.price;
        }
        return total;
      }, 0);

      const monthName = monthStart.toLocaleString("default", { month: "long" });

      return { month: monthName, totalIncome: incomeForMonth };
    });

    res.status(200).json({
      totalIncome,
      monthlyIncomeStats,
    });
  } catch (error) {
    console.error("Error fetching income stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
