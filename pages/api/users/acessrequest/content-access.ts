//acessrequest
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// API Endpoint to fetch content access data for a researcher
const getResearcherContentAccess = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Ensure the request method is GET
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Get the researcher ID from query parameters
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    // Convert userId to a number
    const researcherId = parseInt(userId, 10);

    // Fetch all access requests where the researcher has been granted access
    const accessData = await prisma.accessRequest.findMany({
      where: {
        userId: researcherId,
        status: "APPROVED", // Assuming APPROVED means the researcher has access
      },
      include: {
        content: {
          select: {
            title: true,
            institution: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Transform data into the desired structure
    const responseData = accessData.map((access) => ({
      title: access.content.title,
      institution: access.content.institution.name || "Unknown Institution",
    }));

    // Return the response data
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching researcher content access data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getResearcherContentAccess;
