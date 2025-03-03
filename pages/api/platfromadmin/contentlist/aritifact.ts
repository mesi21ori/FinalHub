import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }


  try {
    // Fetch all photos with artifact details
    const photos = await prisma.content.findMany({
      where: {
        contentType: "PHOTO"},
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        eventType: true,
        isActive: true,
        numberOfViews: true,
        numberOfLikes: true,
        numberOfComments: true,
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
            uploadedBy: true,
            reviwerBy: true,
          },
        },
      },
    });

    console.log("Fetched photos with details:", photos);
    return res.status(200).json({ photos });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
