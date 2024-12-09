// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
// import { Chapa } from 'chapa-nodejs';

// const chapa = new Chapa({
//   secretKey: process.env.CHAPA_SECRET_KEY || '',
// });

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   const { tx_ref } = req.body; 

//   if (!tx_ref) {
//     return res.status(400).json({ error: 'Missing tx_ref' });
//   }

//   try {
//     // Step 1: Verify payment with Chapa API
//     const paymentVerification = await chapa.verify({ tx_ref });

//     if (paymentVerification.status !== 'success') {
//       return res.status(400).json({ error: 'Payment verification failed' });
//     }

//     // Step 2: Find the corresponding subscription and mark it as active
//     await prisma.userSubscription.update({
//       where: { transactionId: tx_ref },
//       data: { isActive: true }, // Mark subscription as active
//     });

//     // Step 3: Respond with success
//     return res.status(200).json({ message: 'Payment verified successfully, subscription activated' });
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     return res.status(500).json({ error: 'An error occurred while verifying the payment' });
//   }
// };

// export default handler;


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY || '',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { tx_ref } = req.body;

  if (!tx_ref) {
    return res.status(400).json({ error: 'Missing tx_ref' });
  }

  try {
    // Step 1: Verify payment with Chapa API
    const paymentVerification = await chapa.verify({ tx_ref });

    if (paymentVerification.status !== 'success') {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Step 2: Find the corresponding subscription
    const subscription = await prisma.userSubscription.findUnique({
      where: { transactionId: tx_ref },
    });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Step 3: Mark the subscription as active
    await prisma.userSubscription.update({
      where: { transactionId: tx_ref },
      data: { isActive: true },
    });

    // Step 4: Find the user associated with the subscription and update their role
    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        role: 'PREMIUM_USER', // Change role to Premium User
        subscription: {
          connect: { id: subscription.id }, // Save subscription ID in the user database
        },
      },
    });

    // Step 5: Respond with success
    return res.status(200).json({ message: 'Payment verified successfully, subscription activated, and user role updated' });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ error: 'An error occurred while verifying the payment' });
  }
};

export default handler;
