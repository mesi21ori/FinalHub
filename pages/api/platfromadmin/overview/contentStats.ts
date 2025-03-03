import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ContentStatsResponse {
  totalContent: number;
  monthlyContentStats: { month: string; count: number }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentStatsResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { year } = req.body;

    if (!year || typeof year !== "number") {
      return res.status(400).json({ error: "Invalid year provided" });
    }

    const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00Z`);

    const content = await prisma.content.findMany({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
      select: {
        createdAt: true,
      },
    });

    const totalContent = content.length;

    const monthlyContentStats = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 1);

      const count = content.filter((entry) => {
        const createdDate = new Date(entry.createdAt);
        return createdDate >= monthStart && createdDate < monthEnd;
      }).length;

      const monthName = monthStart.toLocaleString("default", { month: "long" });

      return { month: monthName, count };
    });

    res.status(200).json({
      totalContent,
      monthlyContentStats,
    });
  } catch (error) {
    console.error("Error fetching content stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
