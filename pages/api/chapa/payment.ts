// // // pages/api/chapa/payment.ts
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '../../../lib/prisma'; // Adjust the import path based on your project structure
// // import { Chapa } from 'chapa-nodejs';

// // const chapa = new Chapa({
// //   secretKey: process.env.CHAPA_SECRET_KEY || '',
// // });

// // // Helper function to generate a transaction reference
// // const generateTransactionReference = (): string => {
// //   return `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
// // };

// // // Helper function to calculate subscription end date based on plan
// // function calculateEndDate(planId: number): Date {
// //   const startDate = new Date();
// //   switch (planId) {
// //     case 1: // Daily plan
// //       startDate.setDate(startDate.getDate() + 1);
// //       break;
// //     case 2: // Monthly plan
// //       startDate.setMonth(startDate.getMonth() + 1);
// //       break;
// //     case 3: // Yearly plan
// //       startDate.setFullYear(startDate.getFullYear() + 1);
// //       break;
// //     default:
// //       throw new Error('Invalid subscription plan');
// //   }
// //   return startDate;
// // }

// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method !== 'POST') {
// //     res.setHeader('Allow', ['POST']);
// //     return res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }

// //   const { amount, email, userId, planId } = req.body;

// //   console.log('Received payload:', req.body);

// //   // Validate input fields
// //   const amountAsNumber = parseFloat(amount);
// //   if (!amountAsNumber || isNaN(amountAsNumber)) {
// //     return res.status(400).json({ error: 'Invalid amount value' });
// //   }

// //   if (!email || !userId || !planId) {
// //     return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
// //   }

// //   try {
// //     // Check if user already has an active subscription
// //     const existingSubscription = await prisma.userSubscription.findUnique({
// //       where: { userId: parseInt(userId) },
// //       include: { plan: true },
// //     });

// //     if (existingSubscription && existingSubscription.isActive) {
// //       // If the user already has an active subscription, prevent new subscription
// //       return res.status(400).json({
// //         error: 'You already have an active subscription. Please wait until it ends before subscribing again.',
// //       });
// //     }

// //     const txRef = generateTransactionReference();

// //     // Initialize payment with Chapa API
// //     const paymentResponse = await chapa.initialize({
// //       amount: amountAsNumber.toString(),
// //       currency: 'ETB',
// //       email,
// //       callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`, // This is where Chapa will notify you
// //       return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`, // The page to show after payment completion
// //       tx_ref: txRef,
// //     });

// //     if (paymentResponse.status !== 'success') {
// //       return res.status(500).json({ error: paymentResponse.message || 'Payment initiation failed' });
// //     }

// //     // Create a user subscription record in the database (Pending payment verification)
// //     await prisma.userSubscription.create({
// //       data: {
// //         userId: parseInt(userId), // Ensure the userId is an integer
// //         planId: parseInt(planId), // Ensure the planId is an integer
// //         transactionId: txRef,
// //         startDate: new Date(),
// //         endDate: calculateEndDate(parseInt(planId)), // Use the correct planId for calculation
// //         isActive: false, // Keep it inactive until payment is verified
// //       },
// //     });

// //     // Return the checkout URL to the frontend
// //     return res.status(200).json({ checkoutUrl: paymentResponse.data?.checkout_url });
// //   } catch (error) {
// //     console.error('Payment initiation error:', error);
// //     return res.status(500).json({ error: 'An error occurred while processing the payment' });
// //   }
// // };

// // export default handler;


// // import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '../../../lib/prisma'; // Adjust the import path based on your project structure
// // import { Chapa } from 'chapa-nodejs';

// // const chapa = new Chapa({
// //   secretKey: process.env.CHAPA_SECRET_KEY || '',
// // });

// // // Helper function to generate a transaction reference
// // const generateTransactionReference = (): string => {
// //   return `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
// // };

// // // Helper function to calculate subscription end date based on plan
// // function calculateEndDate(duration: string): Date {
// //   const startDate = new Date();
// //   switch (duration) {
// //     case 'DAILY': // Daily plan
// //       startDate.setDate(startDate.getDate() + 1);
// //       break;
// //     case 'MONTHLY': // Monthly plan
// //       startDate.setMonth(startDate.getMonth() + 1);
// //       break;
// //     case 'YEARLY': // Yearly plan
// //       startDate.setFullYear(startDate.getFullYear() + 1);
// //       break;
// //     default:
// //       throw new Error('Invalid subscription plan');
// //   }
// //   return startDate;
// // }

// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method !== 'POST') {
// //     res.setHeader('Allow', ['POST']);
// //     return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
// //   }

// //   const { amount, email, userId, planId } = req.body;

// //   console.log('Received payload:', req.body);

// //   // Validate input fields
// //   if (!amount || isNaN(parseFloat(amount))) {
// //     return res.status(400).json({ error: 'Invalid or missing amount' });
// //   }

// //   if (!email || !userId || !planId) {
// //     return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
// //   }

// //   try {
// //     // Step 1: Check if user already has an active subscription
// //     const userIdInt = parseInt(userId, 10);
// //     const existingSubscription = await prisma.userSubscription.findFirst({
// //       where: {
// //         userId: userIdInt,
// //         isActive: true, // Check only active subscriptions
// //       },
// //     });

// //     if (existingSubscription) {
// //       return res.status(400).json({
// //         error: 'You already have an active subscription. Please wait until it ends before subscribing again.',
// //       });
// //     }

// //     // Step 2: Check if the planId exists in the SubscriptionPlan table and retrieve its duration
// //     const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
// //       where: { id: planId },
// //     });

// //     if (!subscriptionPlan) {
// //       return res.status(400).json({
// //         error: `Plan with ID ${planId} does not exist. Please choose a valid plan.`,
// //       });
// //     }

// //     // Step 3: Generate a unique transaction reference
// //     const txRef = generateTransactionReference();

// //     // Step 4: Initialize payment with Chapa
// //     const paymentResponse = await chapa.initialize({
// //       amount: parseFloat(amount).toFixed(2),
// //       currency: 'ETB',
// //       email,
// //       tx_ref: txRef,
// //       callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`,
// //       return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`,
// //     });

// //     if (paymentResponse.status !== 'success') {
// //       return res.status(500).json({
// //         error: paymentResponse.message || 'Payment initiation failed. Please try again later.',
// //       });
// //     }

// //     // Step 5: Create a subscription record in the database (with isActive=false)
// //     await prisma.userSubscription.create({
// //       data: {
// //         userId: userIdInt,
// //         planId: planId,
// //         transactionId: txRef,
// //         startDate: new Date(),
// //         endDate: calculateEndDate(subscriptionPlan.duration), // Using the plan's duration field
// //         isActive: false, // Mark as inactive until payment verification
// //       },
// //     });

// //     // Step 6: Respond with the Chapa checkout URL
// //     return res.status(200).json({
// //       checkoutUrl: paymentResponse.data?.checkout_url,
// //     });
// //   } catch (error) {
// //     console.error('Error processing payment:', error);
// //     return res.status(500).json({
// //       error: 'An error occurred while processing the payment. Please try again later.',
// //     });
// //   }
// // };

// // export default handler;



// // import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '../../../lib/prisma'; 
// // import { Chapa } from 'chapa-nodejs';

// // const chapa = new Chapa({
// //   secretKey: process.env.CHAPA_SECRET_KEY || '',
// // });

// // // Helper function to generate a transaction reference
// // const generateTransactionReference = (): string => {
// //   return `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
// // };

// // // Helper function to calculate subscription end date based on plan's duration
// // function calculateEndDate(duration: 'DAILY' | 'MONTHLY' | 'YEARLY'): Date {
// //   const startDate = new Date();
// //   switch (duration) {
// //     case 'DAILY':
// //       startDate.setDate(startDate.getDate() + 1); 
// //       break;
// //     case 'MONTHLY':
// //       startDate.setMonth(startDate.getMonth() + 1);
// //       break;
// //     case 'YEARLY':
// //       startDate.setFullYear(startDate.getFullYear() + 1); 
// //       break;
// //     default:
// //       throw new Error('Invalid subscription plan duration');
// //   }
// //   return startDate;
// // }

// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method !== 'POST') {
// //     res.setHeader('Allow', ['POST']);
// //     return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
// //   }

// //   const { amount, email, userId, planId } = req.body;

// //   console.log('Received payload:', req.body);

// //   // Validate input fields
// //   if (!amount || isNaN(parseFloat(amount))) {
// //     return res.status(400).json({ error: 'Invalid or missing amount' });
// //   }

// //   if (!email || !userId || !planId) {
// //     return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
// //   }

// //   try {
// //     // Step 1: Check if user already has an active subscription
// //     const userIdInt = parseInt(userId, 10);
// //     const existingSubscription = await prisma.userSubscription.findFirst({
// //       where: {
// //         userId: userIdInt,
// //         isActive: true, // Check only active subscriptions
// //       },
// //     });

// //     if (existingSubscription) {
// //       return res.status(400).json({
// //         error: 'You already have an active subscription. Please wait until it ends before subscribing again.',
// //       });
// //     }

// //     // Step 2: Retrieve subscription plan by planId and validate its existence
// //     const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
// //       where: { id: planId }, // PlanId is the primary key of subscriptionPlan
// //     });

// //     if (!subscriptionPlan) {
// //       return res.status(400).json({
// //         error: `Plan with ID ${planId} does not exist. Please choose a valid plan.`,
// //       });
// //     }

// //     // Step 3: Generate a unique transaction reference
// //     const txRef = generateTransactionReference();

// //     // Step 4: Initialize payment with Chapa
// //     const paymentResponse = await chapa.initialize({
// //       amount: parseFloat(amount).toFixed(2),
// //       currency: 'ETB',
// //       email,
// //       tx_ref: txRef,
// //       callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`,
// //       return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`,
// //     });

// //     if (paymentResponse.status !== 'success') {
// //       return res.status(500).json({
// //         error: paymentResponse.message || 'Payment initiation failed. Please try again later.',
// //       });
// //     }

// //     // Step 5: Create a subscription record in the database (with isActive=false until payment is confirmed)
// //     await prisma.userSubscription.create({
// //       data: {
// //         userId: userIdInt,
// //         planId: planId, 
// //         transactionId: txRef,
// //         startDate: new Date(),
// //         endDate: calculateEndDate(subscriptionPlan.duration), 
// //         isActive: false,
// //       },
// //     });

// //     // Step 6: Respond with the Chapa checkout URL
// //     return res.status(200).json({
// //       checkoutUrl: paymentResponse.data?.checkout_url,
// //     });
// //   } catch (error) {
// //     console.error('Error processing payment:', error);
// //     return res.status(500).json({
// //       error: 'An error occurred while processing the payment. Please try again later.',
// //     });
// //   }
// // };

// // export default handler;



// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
// import { Chapa } from 'chapa-nodejs';

// const chapa = new Chapa({
//   secretKey: process.env.CHAPA_SECRET_KEY || '',
// });

// // Helper function to generate a transaction reference
// const generateTransactionReference = (): string => {
//   return `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
// };

// // Helper function to calculate subscription end date based on plan's duration
// function calculateEndDate(duration: 'DAILY' | 'MONTHLY' | 'YEARLY'): Date {
//   const startDate = new Date();
//   switch (duration) {
//     case 'DAILY':
//       startDate.setDate(startDate.getDate() + 1);
//       break;
//     case 'MONTHLY':
//       startDate.setMonth(startDate.getMonth() + 1);
//       break;
//     case 'YEARLY':
//       startDate.setFullYear(startDate.getFullYear() + 1);
//       break;
//     default:
//       throw new Error('Invalid subscription plan duration');
//   }
//   return startDate;
// }

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   }

//   const { amount, email, userId, planId } = req.body;

//   if (!amount || isNaN(parseFloat(amount))) {
//     return res.status(400).json({ error: 'Invalid or missing amount' });
//   }

//   if (!email || !userId || !planId) {
//     return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
//   }

//   try {
//     const userIdInt = parseInt(userId, 10);

//     // Step 1: Retrieve the user's most recent subscription
//     const recentSubscription = await prisma.userSubscription.findFirst({
//       where: { userId: userIdInt },
//       orderBy: { endDate: 'desc' },
//     });

//     if (recentSubscription) {
//       const now = new Date();

//       if (recentSubscription.isActive && recentSubscription.endDate > now) {
//         // Subscription is active and not expired
//         return res.status(400).json({
//           error: 'You already have an active subscription that has not expired.',
//         });
//       } else if (!recentSubscription.isActive) {
//         // Subscription is inactive, update with new details
//         await prisma.userSubscription.update({
//           where: { id: recentSubscription.id },
//           data: {
//             startDate: now,
//             endDate: calculateEndDate((await prisma.subscriptionPlan.findUnique({
//               where: { id: planId },
//             }))?.duration || 'DAILY'),
//             transactionId: generateTransactionReference(),
//             isActive: false,
//           },
//         });

//         return res.status(200).json({
//           message: 'Subscription updated successfully. Complete payment to activate.',
//         });
//       }
//     }

//     // Step 2: Validate subscription plan
//     const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
//       where: { id: planId },
//     });

//     if (!subscriptionPlan) {
//       return res.status(400).json({
//         error: `Plan with ID ${planId} does not exist.`,
//       });
//     }

//     // Step 3: Generate a transaction reference and initialize payment
//     const txRef = generateTransactionReference();
//     const paymentResponse = await chapa.initialize({
//       amount: parseFloat(amount).toFixed(2),
//       currency: 'ETB',
//       email,
//       tx_ref: txRef,
//       callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`,
//       return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`,
//     });

//     if (paymentResponse.status !== 'success') {
//       return res.status(500).json({
//         error: paymentResponse.message || 'Payment initiation failed.',
//       });
//     }

//     // Step 4: Create a new subscription record
//     await prisma.userSubscription.create({
//       data: {
//         userId: userIdInt,
//         planId,
//         transactionId: txRef,
//         startDate: new Date(),
//         endDate: calculateEndDate(subscriptionPlan.duration),
//         isActive: false,
//       },
//     });

//     return res.status(200).json({
//       checkoutUrl: paymentResponse.data?.checkout_url,
//     });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     return res.status(500).json({
//       error: 'An error occurred while processing the payment.',
//     });
//   }
// };

// export default handler;

// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
// import { Chapa } from 'chapa-nodejs';

// const chapa = new Chapa({
//   secretKey: process.env.CHAPA_SECRET_KEY || '',
// });

// const generateTransactionReference = (): string =>
//   `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

// const calculateEndDate = (duration: 'DAILY' | 'MONTHLY' | 'YEARLY'): Date => {
//   const startDate = new Date();
//   switch (duration) {
//     case 'DAILY':
//       startDate.setDate(startDate.getDate() + 1);
//       break;
//     case 'MONTHLY':
//       startDate.setMonth(startDate.getMonth() + 1);
//       break;
//     case 'YEARLY':
//       startDate.setFullYear(startDate.getFullYear() + 1);
//       break;
//     default:
//       throw new Error('Invalid subscription duration');
//   }
//   return startDate;
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   }

//   const { amount, email, userId, planId } = req.body;

//   // Validate input fields
//   if (!amount || isNaN(parseFloat(amount))) {
//     return res.status(400).json({ error: 'Invalid or missing amount' });
//   }

//   if (!email || !userId || !planId) {
//     return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
//   }

//   try {
//     const userIdInt = parseInt(userId, 10);
//     const now = new Date();

//     // Check if the user already has an active subscription
//     const activeSubscription = await prisma.userSubscription.findFirst({
//       where: { userId: userIdInt, isActive: true },
//       orderBy: { endDate: 'desc' }, // Fetch the most recent active subscription
//     });

//     // If the user already has an active subscription, don't create a new one
//     if (activeSubscription) {
//       return res.status(400).json({ error: 'User already has an active subscription.' });
//     }

//     // If there's an inactive subscription, deactivate it and create a new one
//     const recentSubscription = await prisma.userSubscription.findFirst({
//       where: { userId: userIdInt },
//       orderBy: { endDate: 'desc' }, // Fetch the most recent subscription
//     });

//     if (recentSubscription && !recentSubscription.isActive) {
//       // Deactivate the old subscription if it is within the valid period
//       if (recentSubscription.endDate > now) {
//         await prisma.userSubscription.update({
//           where: { id: recentSubscription.id },
//           data: {
//             isActive: false,
//           },
//         });
//       }

//       // Create a new subscription (inactive until payment confirmation)
//       const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
//         where: { id: planId },
//       });

//       if (!subscriptionPlan) {
//         return res.status(400).json({
//           error: `Plan with ID ${planId} does not exist.`,
//         });
//       }

//       const txRef = generateTransactionReference();

//       const paymentResponse = await chapa.initialize({
//         amount: parseFloat(amount).toFixed(2),
//         currency: 'ETB',
//         email,
//         tx_ref: txRef,
//         callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`,
//         return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`,
//       });

//       if (paymentResponse.status !== 'success') {
//         console.error('Payment initiation failed:', paymentResponse);
//         return res.status(500).json({
//           error: paymentResponse.message || 'Payment initiation failed. Please try again later.',
//         });
//       }

//       // Create a new subscription entry for this user (inactive until payment confirmed)
//       await prisma.userSubscription.create({
//         data: {
//           userId: userIdInt,
//           planId: planId,
//           transactionId: txRef,
//           startDate: now,
//           endDate: calculateEndDate(subscriptionPlan.duration),
//           isActive: false, // Mark as inactive until payment is confirmed
//         },
//       });

//       return res.status(200).json({
//         checkoutUrl: paymentResponse.data?.checkout_url,
//       });
//     }

//     return res.status(400).json({ error: 'No valid subscription found for the user.' });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     return res.status(500).json({
//       error: 'An error occurred while processing the payment. Please try again later.',
//     });
//   }
// };

// export default handler;


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY || '',
});

const generateTransactionReference = (): string =>
  `tx_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

const calculateEndDate = (duration: 'DAILY' | 'MONTHLY' | 'YEARLY'): Date => {
  const startDate = new Date();
  switch (duration) {
    case 'DAILY':
      startDate.setDate(startDate.getDate() + 1);
      break;
    case 'MONTHLY':
      startDate.setMonth(startDate.getMonth() + 1);
      break;
    case 'YEARLY':
      startDate.setFullYear(startDate.getFullYear() + 1);
      break;
    default:
      throw new Error('Invalid subscription duration');
  }
  return startDate;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { amount, email, userId, planId } = req.body;

  // Validate input fields
  if (!amount || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: 'Invalid or missing amount' });
  }

  if (!email || !userId || !planId) {
    return res.status(400).json({ error: 'Missing required fields: email, userId, or planId' });
  }

  try {
    const userIdInt = parseInt(userId, 10);
    const now = new Date();

    // Check if the user already has an active subscription
    const activeSubscription = await prisma.userSubscription.findFirst({
      where: { userId: userIdInt, isActive: true },
      orderBy: { endDate: 'desc' }, // Fetch the most recent active subscription
    });

    if (activeSubscription) {
      // If the user has an active subscription, you can either:
      // 1. Extend the current active subscription.
      // 2. Update the existing subscription (e.g., to extend the end date, change the plan, etc.).
      return res.status(400).json({ error: 'User already has an active subscription.' });
    }

    // If there's an inactive subscription, deactivate it and create a new one
    const recentSubscription = await prisma.userSubscription.findFirst({
      where: { userId: userIdInt },
      orderBy: { endDate: 'desc' }, // Fetch the most recent subscription
    });

    if (recentSubscription && !recentSubscription.isActive) {
      // Deactivate the old subscription if it is within the valid period
      if (recentSubscription.endDate > now) {
        await prisma.userSubscription.update({
          where: { id: recentSubscription.id },
          data: {
            isActive: false,
          },
        });
      }

      // Create a new subscription entry for this user (inactive until payment confirmation)
      const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId },
      });

      if (!subscriptionPlan) {
        return res.status(400).json({
          error: `Plan with ID ${planId} does not exist.`,
        });
      }

      const txRef = generateTransactionReference();

      const paymentResponse = await chapa.initialize({
        amount: parseFloat(amount).toFixed(2),
        currency: 'ETB',
        email,
        tx_ref: txRef,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/chapa/callback`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?tx_ref=${txRef}`,
      });

      if (paymentResponse.status !== 'success') {
        console.error('Payment initiation failed:', paymentResponse);
        return res.status(500).json({
          error: paymentResponse.message || 'Payment initiation failed. Please try again later.',
        });
      }

      // Create a new subscription entry for this user (inactive until payment confirmed)
      await prisma.userSubscription.create({
        data: {
          userId: userIdInt,
          planId: planId,
          transactionId: txRef,
          startDate: now,
          endDate: calculateEndDate(subscriptionPlan.duration),
          isActive: false, // Mark as inactive until payment is confirmed
        },
      });

      return res.status(200).json({
        checkoutUrl: paymentResponse.data?.checkout_url,
      });
    }

    return res.status(400).json({ error: 'No valid subscription found for the user.' });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({
      error: 'An error occurred while processing the payment. Please try again later.',
    });
  }
};

export default handler;
