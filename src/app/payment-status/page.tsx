// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import LogoNavBar from '../../../components/LogoNavBar';

// const PaymentStatus = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const tx_ref = searchParams?.get('tx_ref'); // Check if searchParams is not null

//   const [status, setStatus] = useState('pending');
//   const [message, setMessage] = useState('Verifying your payment...');

//   useEffect(() => {
//     if (tx_ref) {
//       fetch('/api/chapa/callback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ tx_ref }),
//       })
//         .then(async (response) => {
//           const data = await response.json();
//           if (response.ok) {
//             setStatus('success');
//             setMessage('Your payment was successful, and your subscription is now active!');
//             sessionStorage.setItem('userRole', 'premium'); 
//           } else {
//             setStatus('failed');
//             setMessage('Payment verification failed. Please try again.');
//           }
//         })
//         .catch((error) => {
//           setStatus('failed');
//           setMessage('An error occurred while verifying the payment. Please try again later.');
//           console.error('Payment verification error:', error);
//         });
//     }
//   }, [tx_ref]);

//   // Platform-specific colors
//   const primaryColor = '#3a2f2c'; // Example: Replace with your platform's primary color
//   const secondaryColor = '#F7F6E9'; // Example: Replace with your platform's secondary color

//   return (
//     <div style={{ backgroundColor: secondaryColor, minHeight: '100vh' }}>
//       {/* Navigation Bar */}
//       <LogoNavBar />

//       <div
//         style={{
//           textAlign: 'center',
//           padding: '20px',
//           color: primaryColor,
//           marginTop: '80px', // Adjust margin to accommodate the fixed navbar
//         }}
//       >
//         <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Payment Status</h1>
//         {status === 'pending' && (
//           <p
//             style={{
//               fontSize: '1.2rem',
//               marginTop: '20px',
//               animation: 'blink 1s linear infinite',
//               color: primaryColor,
//             }}
//           >
//             Loading...
//           </p>
//         )}
//         {status !== 'pending' && (
//           <>
//             <div
//               style={{
//                 marginTop: '20px',
//                 padding: '15px',
//                 borderRadius: '8px',
//                 backgroundColor: status === 'success' ? '#4CAF50' : '#F44336',
//                 color: '#fff',
//               }}
//             >
//               <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
//                 Status: {status.toUpperCase()}
//               </p>
//               <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>{message}</p>
//             </div>
//             <div style={{ marginTop: '30px' }}>
//               {status === 'success' ? (
//                 <a
//                   href="/content/content-page"
//                   style={{
//                     display: 'inline-block',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     backgroundColor: primaryColor,
//                     color: '#fff',
//                     textDecoration: 'none',
//                     fontSize: '1rem',
//                     fontWeight: 'bold',
//                     transition: 'background-color 0.3s ease',
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6b4f3d')}
//                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryColor)}
//                 >
//                   Go to Content
//                 </a>
//               ) : (
//                 <a
//                   href="/subscription"
//                   style={{
//                     display: 'inline-block',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     backgroundColor: '#F44336',
//                     color: '#fff',
//                     textDecoration: 'none',
//                     fontSize: '1rem',
//                     fontWeight: 'bold',
//                     transition: 'background-color 0.3s ease',
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
//                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F44336')}
//                 >
//                   Retry Subscription
//                 </a>
//               )}
//             </div>
//           </>
//         )}
//         <style>
//           {`
//             @keyframes blink {
//               0% { opacity: 1; }
//               50% { opacity: 0.5; }
//               100% { opacity: 1; }
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// };

// export default PaymentStatus;


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LogoNavBar from '../../../components/LogoNavBar';
import LoadingSpinner from '../../../components/LoadingSpinner';  // Import the LoadingSpinner component

const PaymentStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tx_ref = searchParams?.get('tx_ref'); // Check if searchParams is not null

  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your payment...');
  const [loading, setLoading] = useState(true);  // Loading state

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
            setMessage('Your payment was successful, and your subscription is now active!');
            sessionStorage.setItem('userRole', 'premium');
          } else {
            setStatus('failed');
            setMessage('Payment verification failed. Please try again.');
          }
          setLoading(false); // Stop loading when the response is received
        })
        .catch((error) => {
          setStatus('failed');
          setMessage('An error occurred while verifying the payment. Please try again later.');
          console.error('Payment verification error:', error);
          setLoading(false); // Stop loading if there's an error
        });
    }
  }, [tx_ref]);

  // Platform-specific colors with lightened versions
  const primaryColor = '#3a2f2c'; // Example: Replace with your platform's primary color
  const secondaryColor = '#F7F6E9'; // Example: Replace with your platform's secondary color
  const lightGreen = '#81C784';  // Lightened version of green
  const lightRed = '#E57373';    // Lightened version of red

  return (
    <div style={{ backgroundColor: secondaryColor, minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <LogoNavBar />

      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          color: primaryColor,
          marginTop: '80px', // Adjust margin to accommodate the fixed navbar
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Payment Status</h1>
        {loading && (
          <LoadingSpinner />  // Display the spinner while loading
        )}
        {status !== 'pending' && !loading && (
          <>
            <div
              style={{
                marginTop: '20px',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: status === 'success' ? lightGreen : lightRed,  // Use lightened colors
                color: '#fff',
              }}
            >
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Status: {status.toUpperCase()}
              </p>
              <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>{message}</p>
            </div>
            <div style={{ marginTop: '30px' }}>
              {status === 'success' ? (
                <a
                  href="/content/content-page"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: primaryColor,
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6b4f3d')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryColor)}
                >
                  Go to Content
                </a>
              ) : (
                <a
                  href="/subscription"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#F44336',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F44336')}
                >
                  Retry Subscription
                </a>
              )}
            </div>
          </>
        )}
        <style>
          {`
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PaymentStatus;
