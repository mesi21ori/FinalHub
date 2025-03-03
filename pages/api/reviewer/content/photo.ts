// pages/api/reviewer/content/photo.ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { institutionId } = req.query;

  // Validate that institutionId is present
  if (!institutionId) {
    return res.status(400).json({ message: "Institution ID is required" });
  }

  try {
    // Fetch all content uploaded by the specific institution where isActive is false
    const content = await prisma.content.findMany({
      where: {
        contentType: "PHOTO",
        institutionId: Number(institutionId), // Match institutionId with uploaderId
        isActive: false, // Only fetch inactive content
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        fileUrl: true,
        eventType: true,
        artifactDetails: {
          select: {
            format: true,
            resolution: true,
            aspectRatio: true,
            photoLocation: true,
            capturedDate: true,
            photographer: true,
            cameraMake: true,
            cameraModel: true,
            historicalFigures: true,
            relatedArticles: true,
          },
        },
      },
    });

    console.log("Fetched photos with details:", content);
    return res.status(200).json({ photos: content });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
