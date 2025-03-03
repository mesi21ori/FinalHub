//pages\api\platfromadmin\overview\userStats.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserStatsResponse {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsers: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserStatsResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { year } = req.body;

    if (!year || typeof year !== "number") {
      return res.status(400).json({ error: "Invalid year provided" });
    }

    // Parse the year range
    const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00Z`);

    // Fetch all users within the specified year
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
    });

    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({ where: { isActive: true } });
    const inactiveUsers = await prisma.user.count({ where: { isActive: false } });
    const newUsers = users.length;

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      newUsers,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
