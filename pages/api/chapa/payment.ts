import { NextApiRequest, NextApiResponse } from 'next';
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY || '', 
});

const generateTransactionReference = () => {
  return `tx_${Date.now()}`; 
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, email, userId } = req.body;

    if (!amount || !email || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      
      const paymentResponse = await chapa.initialize({
        amount,
        currency: 'ETB', 
        email,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/chapa/callback`, 
        tx_ref: generateTransactionReference(), 
      });

      if (paymentResponse.status === 'success') {
        return res.status(200).json({ checkoutUrl: paymentResponse.data?.checkout_url });
      } else {
        return res.status(500).json({ error: paymentResponse.message || 'Payment initiation failed' });
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      return res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
