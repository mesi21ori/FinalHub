// pages/payment-failed.tsx

import React from 'react';
import Link from 'next/link';

const PaymentFailed: React.FC = () => {
  return (
    <div>
      <h1>Payment Failed!</h1>
      <p>There was an issue processing your payment. Please try again.</p>
      <Link href="/upgrade">Go back to upgrade page</Link>
    </div>
  );
};

export default PaymentFailed;
