// src/pages/api/plans/toggle.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, isActive } = req.body;

  if (!id || typeof id !== "number" || typeof isActive !== "boolean") {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const updatedPlan = await prisma.subscriptionPlan.update({
      where: { id },
      data: { isActive: !isActive }, // Toggle the status
    });

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
