// // pages/api/subscription.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// const getSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const userId = Number(req.query.userId); // Get userId from query params
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const userSubscription = await prisma.userSubscription.findFirst({
//       where: {
//         userId,
//         isActive: true, // Only active subscriptions
//       },
//       include: {
//         plan: true, // Include the associated plan data
//       },
//     });

//     if (!userSubscription) {
//       return res.status(404).json({ message: "No active subscription found" });
//     }

//     const subscriptionDetails = {
//       plan: userSubscription.plan.name,
//       nextBillingDate: userSubscription.endDate.toISOString(),
//       features: userSubscription.plan.features,
//     };

//     res.status(200).json(subscriptionDetails);
//   } catch (error) {
//     console.error("Error fetching subscription:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default getSubscription;

// //pages\api\users\subscription\subscription.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// // Function to format date as yyyy/mm/dd
// const formatDate = (date: Date) => {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (0-11), so we add 1 and ensure 2 digits
//   const day = date.getDate().toString().padStart(2, "0"); // Get day (1-31) and ensure 2 digits
//   return `${year}/${month}/${day}`;
// };

// const getSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const userId = Number(req.query.userId); // Get userId from query params
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const userSubscription = await prisma.userSubscription.findFirst({
//       where: {
//         userId,
//         isActive: true, // Only active subscriptions
//       },
//       include: {
//         plan: true, // Include the associated plan data
//       },
//     });

//     if (!userSubscription) {
//       return res.status(404).json({ message: "No active subscription found" });
//     }

//     const subscriptionDetails = {
//       plan: userSubscription.plan.name,
//       nextBillingDate: formatDate(userSubscription.endDate), // Format date as yyyy/mm/dd
//       features: userSubscription.plan.features,
//     };

//     res.status(200).json(subscriptionDetails);
//   } catch (error) {
//     console.error("Error fetching subscription:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default getSubscription;


// pages/api/users/subscription/subscription.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// Function to format date as yyyy/mm/dd
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const getSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = Number(req.query.userId); // Get userId from query params
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId,
        isActive: true, // Only active subscriptions
      },
      include: {
        plan: true, // Include the associated plan data
      },
    });

    if (!userSubscription) {
      return res.status(404).json({ message: "No active subscription found" });
    }

    const subscriptionDetails = {
      plan: userSubscription.plan.name,
      nextBillingDate: formatDate(userSubscription.endDate), // Format date as yyyy/mm/dd
      features: userSubscription.plan.features,
    };

    res.status(200).json(subscriptionDetails);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getSubscription;
