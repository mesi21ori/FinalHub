import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma'; // Ensure this imports your prisma client

const getSubscriptions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search } = req.query;

  try {
    // Fetch subscriptions from the database without applying any plan filter
    const subscriptions = await prisma.userSubscription.findMany({
      where: {
        user: {
          OR: [
            { firstName: { contains: search as string, mode: 'insensitive' } },
            { lastName: { contains: search as string, mode: 'insensitive' } },
          ],
        },
      },
      include: {
        user: true,
        plan: true,
      },
    });

    // Format the startDate and endDate to yyyy/mm/dd
    const formattedSubscriptions = subscriptions.map(sub => ({
      ...sub,
      startDate: sub.startDate.toISOString().split('T')[0].replace(/-/g, '/'),
      endDate: sub.endDate.toISOString().split('T')[0].replace(/-/g, '/'),
    }));

    // If no subscriptions found, log and send an empty array
    if (!formattedSubscriptions || formattedSubscriptions.length === 0) {
      console.log("No subscriptions found for the given search term");
    }

    // Send the subscriptions data as a JSON response
    res.status(200).json(formattedSubscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: 'Error fetching subscriptions' });
  }
};

export default getSubscriptions;
