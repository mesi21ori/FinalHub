// // pages/api/verify-payment.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Chapa } from 'chapa-nodejs';

// const chapa = new Chapa({
//   secretKey: process.env.CHAPA_SECRET_KEY || '',
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { tx_ref } = req.query;

//   if (!tx_ref) {
//     return res.status(400).json({ response: { status: 'failed', message: 'Transaction reference is missing.' } });
//   }

//   try {
//     // Call Chapa API to verify the payment using the transaction reference
//     const paymentStatus = await chapa.verifyPayment(tx_ref.toString());

//     if (paymentStatus.status === 'success') {
//       // Payment was successful
//       return res.status(200).json({ response: { status: 'success' } });
//     } else {
//       // Payment failed
//       return res.status(200).json({ response: { status: 'failed', message: 'Payment verification failed.' } });
//     }
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     return res.status(500).json({ response: { status: 'failed', message: 'Internal server error.' } });
//   }
// }
