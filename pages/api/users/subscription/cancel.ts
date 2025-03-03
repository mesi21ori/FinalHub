import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const cancelSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    console.log("Request received:", req.body);

    const { userId, cancellationReason } = req.body;

    // Validate the request body
    if (!userId || !cancellationReason) {
      console.error("Invalid payload:", req.body);
      return res.status(400).json({ message: "User ID and cancellation reason are required" });
    }

    // Perform the database operation
    const result = await prisma.userSubscription.updateMany({
      where: {
        userId: Number(userId),
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    if (result.count === 0) {
      console.error("No active subscription found for cancellation.");
      return res.status(404).json({ message: "No active subscription found." });
    }

    console.log("Subscription canceled successfully:", result);
    return res.status(200).json({ message: "Subscription successfully canceled." });
  } catch (error) {
    console.error("Error in cancelSubscription handler:", error);
    return res.status(500).json({ message: "Internal Server Error", error: String(error) });
  }
};

export default cancelSubscription;
