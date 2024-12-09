// pages/payment-success.tsx

import React from 'react';
import Link from 'next/link';

const PaymentSuccess: React.FC = () => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your subscription has been activated successfully.</p>
      <Link href="/dashboard">Go to your dashboard</Link>
    </div>
  );
};

export default PaymentSuccess;
