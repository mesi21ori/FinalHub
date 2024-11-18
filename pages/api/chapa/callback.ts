import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { status, transaction_id, email } = req.body; 


    if (!status || !transaction_id || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {

      if (status === 'successful') {
     
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        await prisma.userSubscription.update({
          where: { userId: user.id },
          data: {
            isActive: true,
            startDate: new Date(), 
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Example: set to one year later
          },
        });

        
        return res.status(200).json({ message: 'Payment processed successfully' });
      } else {
        
        console.warn('Payment failed:', status, transaction_id);
        return res.status(400).json({ message: 'Payment failed', status });
      }
    } catch (error) {
      console.error('Error processing callback:', error);
      return res.status(500).json({ error: 'An error occurred while processing the callback' });
    }
  } else {
   
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default callbackHandler;
