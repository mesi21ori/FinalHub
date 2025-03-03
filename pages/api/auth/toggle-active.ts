// pages/api/staff/toggle-active.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, institutionId, newStatus } = req.body;

  try {
    
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        institutionId: institutionId, 
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found or not part of this institution" });
    }

    // Update the user's active status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: newStatus },
    });

    return res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
