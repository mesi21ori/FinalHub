// // page/UpgradeCard.tsx
// import React from 'react';
// import { useRouter } from 'next/router'; // Import the router hook for navigation
// import '../src/app/globals.css';

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   features: string[];
// }

// interface UpgradeCardProps {
//   plan: Plan;
//   userId: string;
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
//   const router = useRouter(); // Initialize useRouter hook

//   const handleChoosePlan = async () => {
//     const email = localStorage.getItem('userEmail');
//     const userIdFromStorage = localStorage.getItem('userId');
  
//     if (!email || !userIdFromStorage) {
//       alert('User email or ID not found. Please log in.');
//       return;
//     }
  
//     try {
//       const priceAsNumber = parseFloat(plan.price);
//       if (isNaN(priceAsNumber)) {
//         alert('Invalid plan price.');
//         return;
//       }
  
//       const response = await fetch('/api/chapa/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: priceAsNumber,
//           email,
//           userId: userIdFromStorage,
//           planId: plan.id,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         console.error('Payment API Error:', data);
//         alert(data.error || 'Failed to initiate payment');
//         return;
//       }
  
//       if (!data.checkoutUrl) {
//         console.error('No checkout URL returned:', data);
//         throw new Error('Checkout URL not returned');
//       }
  
//       window.location.href = data.checkoutUrl;
//     } catch (error) {
//       if (error instanceof Error) {
//         // If the error has a `message` property, we log and display it
//         console.error('Error initiating payment:', error.message);
//         alert('An error occurred while processing the payment: ' + error.message);
//       } else {
//         // Handle cases where error isn't an instance of Error
//         console.error('Unexpected error:', error);
//         alert('An unexpected error occurred.');
//       }
//     }
//   };
  
  

//   return (
//     <div key={plan.id} className="bg-[#E5E5CB] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#D5CEA3] h-96 w-80 mx-auto mb-10 group relative">
//       <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//       <p className="text-2xl font-bold text-[#D5CEA3] group-hover:text-[#3C2A21]">{plan.price} ETB</p>
//       <ul className="my-4 text-left">
//         {Array.isArray(plan.features) && plan.features.length > 0 ? (
//           plan.features.map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D5CEA3] mr-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="#3C2A21">
//                   <path d="M9 19.3l-7.3-7.3 1.4-1.4L9 16.5l12.6-12.6 1.4 1.4L9 19.3z" />
//                 </svg>
//               </span>
//               <span className="text-[#3C2A21]">{feature}</span>
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No features available.</li>
//         )}
//       </ul>
//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
//         <button onClick={handleChoosePlan} className="bg-[#3C2A21] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300">
//           Choose Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpgradeCard;



// import React from 'react';
// import { useRouter } from 'next/navigation'; 
// import '../src/app/globals.css';

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   features: string[];
// }

// interface UpgradeCardProps {
//   plan: Plan;
//   userId: string;
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
//   const router = useRouter(); 

//   const handleChoosePlan = async () => {
//     const email = localStorage.getItem('userEmail');
//     const userIdFromStorage = localStorage.getItem('userId');
  
//     if (!email || !userIdFromStorage) {
//       alert('User email or ID not found. Please log in.');
//       return;
//     }
  
//     try {
//       const priceAsNumber = parseFloat(plan.price);
//       if (isNaN(priceAsNumber)) {
//         alert('Invalid plan price.');
//         return;
//       }
  
//       const response = await fetch('/api/chapa/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: priceAsNumber,
//           email,
//           userId: userIdFromStorage,
//           planId: plan.id,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         console.error('Payment API Error:', data);
//         alert(data.error || 'Failed to initiate payment');
//         return;
//       }
  
//       if (!data.checkoutUrl) {
//         console.error('No checkout URL returned:', data);
//         throw new Error('Checkout URL not returned');
//       }
  
//       window.location.href = data.checkoutUrl;
//     } catch (error) {
//       if (error instanceof Error) {
//         // If the error has a `message` property, we log and display it
//         console.error('Error initiating payment:', error.message);
//         alert('An error occurred while processing the payment: ' + error.message);
//       } else {
//         // Handle cases where error isn't an instance of Error
//         console.error('Unexpected error:', error);
//         alert('An unexpected error occurred.');
//       }
//     }
//   };
  
//   return (
//     <div className="bg-[#F7F6E9] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#E5E5CB] h-96 w-80 mx-auto mb-10 group">
//       <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//       <p className="text-2xl font-bold text-[#E5E5CB] group-hover:text-[#3a2f2c]">
//         {plan.price}
//       </p>
//       <ul className="my-4 text-left">
//         {plan.features.map((feature, index) => (
//           <li key={index} className="flex items-center mb-2">
//             <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E5E5CB] mr-2">
//               {/* Inline SVG Checkmark */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="10"
//                 height="10"
//                 viewBox="0 0 24 24"
//                 fill="#3C2A21" // Set color directly
//               >
//                 <path d="M9 19.3l-7.3-7.3 1.4-1.4L9 16.5l12.6-12.6 1.4 1.4L9 19.3z" />
//               </svg>
//             </span>
//             <span className="text-[#3a2f2c]">{feature}</span>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleChoosePlan} className="bg-[#3a2f2c] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300">
//         Choose Plan
//       </button>
//     </div>
//   );
// };


// export default UpgradeCard;


// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; 
// import Notification from './Notification'; // Import the Notification component
// import '../src/app/globals.css';

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   features: string[];
// }

// interface UpgradeCardProps {
//   plan: Plan;
//   userId: string;
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
//   const router = useRouter();
//   const [notification, setNotification] = useState({
//     message: '',
//     type: 'success' as 'success' | 'error' | 'warning',
//     visible: false,
//   });

//   const showNotification = (message: string, type: 'success' | 'error' | 'warning') => {
//     setNotification({ message, type, visible: true });
//   };

//   const handleChoosePlan = async () => {
//     const email = localStorage.getItem('userEmail');
//     const userIdFromStorage = localStorage.getItem('userId');
  
//     if (!email || !userIdFromStorage) {
//       showNotification('User email or ID not found. Please log in.', 'error');
//       return;
//     }
  
//     try {
//       const priceAsNumber = parseFloat(plan.price);
//       if (isNaN(priceAsNumber)) {
//         showNotification('Invalid plan price.', 'error');
//         return;
//       }
  
//       const response = await fetch('/api/chapa/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: priceAsNumber,
//           email,
//           userId: userIdFromStorage,
//           planId: plan.id,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         console.error('Payment API Error:', data);
//         showNotification(data.error || 'Failed to initiate payment', 'error');
//         return;
//       }
  
//       if (!data.checkoutUrl) {
//         console.error('No checkout URL returned:', data);
//         throw new Error('Checkout URL not returned');
//       }
  
//       showNotification('Redirecting to payment...', 'success');
//       window.location.href = data.checkoutUrl;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error initiating payment:', error.message);
//         showNotification(`An error occurred: ${error.message}`, 'error');
//       } else {
//         console.error('Unexpected error:', error);
//         showNotification('An unexpected error occurred.', 'error');
//       }
//     }
//   };
  
//   return (
//     <div>
//       <div className="bg-[#F7F6E9] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#E5E5CB] h-96 w-80 mx-auto mb-10 group">
//         <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//         <p className="text-2xl font-bold text-[#E5E5CB] group-hover:text-[#3a2f2c]">
//           {plan.price}
//         </p>
//         <ul className="my-4 text-left">
//           {plan.features.map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E5E5CB] mr-2">
//                 {/* Inline SVG Checkmark */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   height="10"
//                   viewBox="0 0 24 24"
//                   fill="#3C2A21"
//                 >
//                   <path d="M9 19.3l-7.3-7.3 1.4-1.4L9 16.5l12.6-12.6 1.4 1.4L9 19.3z" />
//                 </svg>
//               </span>
//               <span className="text-[#3a2f2c]">{feature}</span>
//             </li>
//           ))}
//         </ul>
//         <button
//           onClick={handleChoosePlan}
//           className="bg-[#3a2f2c] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300"
//         >
//           Choose Plan
//         </button>
//       </div>

//       {/* Render the Notification component */}
//       <Notification
//         message={notification.message}
//         type={notification.type}
//         visible={notification.visible}
//         onClose={() => setNotification({ ...notification, visible: false })}
//       />
//     </div>
//   );
// };

// export default UpgradeCard;


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Notification from './Notification'; // Import the Notification component
import '../src/app/globals.css';

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

interface UpgradeCardProps {
  plan: Plan;
  userId: string;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
    visible: false,
  });

  const showNotification = (message: string, type: 'success' | 'error' | 'warning') => {
    setNotification({ message, type, visible: true });
  };

  const handleChoosePlan = async () => {
    const email = localStorage.getItem('userEmail');
    const userIdFromStorage = localStorage.getItem('userId');
  
    if (!email || !userIdFromStorage) {
      showNotification('User email or ID not found. Please log in.', 'error');
      return;
    }
  
    try {
      const priceAsNumber = parseFloat(plan.price);
      if (isNaN(priceAsNumber)) {
        showNotification('Invalid plan price.', 'error');
        return;
      }
  
      if (priceAsNumber === 0 || plan.price === "0" || plan.price === null) {
        // If the plan is a free trial (price is 0 or null), handle accordingly
        const response = await fetch('/api/chapa/freetrial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            userId: userIdFromStorage,
            planId: plan.id,
          }),
        });
  
        const textResponse = await response.text(); // Get the raw text response
  
        // Check if the response is valid JSON
        let data;
        try {
          data = JSON.parse(textResponse);
        } catch (e) {
          throw new Error('Unexpected response format, expected JSON.');
        }
  
        if (!response.ok) {
          console.error('Free Trial API Error:', data);
          showNotification(data.error || 'Failed to initiate free trial', 'error');
          return;
        }
  
        showNotification('Free trial activated successfully!', 'success');
        // Optionally, redirect or take further action after activating the free trial
        router.push('/dashboard');  // Example redirection after free trial success
      } else {
        // If the plan is paid, handle the normal payment process
        const response = await fetch('/api/chapa/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: priceAsNumber,
            email,
            userId: userIdFromStorage,
            planId: plan.id,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error('Payment API Error:', data);
          showNotification(data.error || 'Failed to initiate payment', 'error');
          return;
        }
  
        if (!data.checkoutUrl) {
          console.error('No checkout URL returned:', data);
          throw new Error('Checkout URL not returned');
        }
  
        showNotification('Redirecting to payment...', 'success');
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error initiating payment:', error.message);
        showNotification(`An error occurred: ${error.message}`, 'error');
      } else {
        console.error('Unexpected error:', error);
        showNotification('An unexpected error occurred.', 'error');
      }
    }
  };
  
  
  return (
    <div>
      <div className="bg-[#F7F6E9] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#E5E5CB] h-96 w-80 mx-auto mb-10 group">
        <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
        <p className="text-2xl font-bold text-[#E5E5CB] group-hover:text-[#3a2f2c]">
          {plan.price}
        </p>
        <ul className="my-4 text-left">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E5E5CB] mr-2">
                {/* Inline SVG Checkmark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="#3C2A21"
                >
                  <path d="M9 19.3l-7.3-7.3 1.4-1.4L9 16.5l12.6-12.6 1.4 1.4L9 19.3z" />
                </svg>
              </span>
              <span className="text-[#3a2f2c]">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleChoosePlan}
          className="bg-[#3a2f2c] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300"
        >
          Choose Plan
        </button>
      </div>

      {/* Render the Notification component */}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </div>
  );
};

export default UpgradeCard;
