import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PaymentStatus = () => {
  const router = useRouter();
  const { tx_ref } = router.query;

  const [status, setStatus] = useState('pending'); 
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    if (tx_ref) {
    
      fetch('/api/chapa/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tx_ref }),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            setStatus('success');
            setMessage(data.message || 'Your payment was successful, and your subscription is now active!');
          } else {
            setStatus('failed');
            setMessage(data.error || 'Payment verification failed. Please try again.');
          }
        })
        .catch((error) => {
          setStatus('failed');
          setMessage('An error occurred while verifying the payment. Please try again later.');
          console.error('Payment verification error:', error);
        });
    }
  }, [tx_ref]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Payment Status</h1>
      {status === 'pending' && <p>Loading...</p>}
      {status !== 'pending' && (
        <>
          <p>Status: <strong>{status.toUpperCase()}</strong></p>
          <p>{message}</p>
          <div style={{ marginTop: '20px' }}>
            {status === 'success' ? (
              <a href="/content" style={{ color: 'green', textDecoration: 'none' }}>
                Go to Content
              </a>
            ) : (
              <a href="/subscription" style={{ color: 'red', textDecoration: 'none' }}>
                Retry Subscription
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentStatus;
