// import React from "react";
// import '../src/app/globals.css'; 

// interface Plan {
//   id: number; // Include an id for keys in lists
//   name: string;
//   price: string;
//   features: string[]; // Ensure this is an array of strings
// }

// interface UpgradeCardProps {
//   plan: Plan; // Accept plan as a prop
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan }) => { // Destructure the plan prop
//   return (
//     <div key={plan.id} className="bg-[#E5E5CB] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#D5CEA3] h-96 w-80 mx-auto mb-10 group relative">
//       <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//       <p className="text-2xl font-bold text-[#D5CEA3] group-hover:text-[#3C2A21]">
//         {plan.price} ETB
//       </p>
//       <ul className="my-4 text-left">
//         {Array.isArray(plan.features) && plan.features.length > 0 ? (
//           plan.features.map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D5CEA3] mr-2">
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
//               <span className="text-[#3C2A21]">{feature}</span>
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No features available.</li>
//         )}
//       </ul>
      
//       {/* Fixed button wrapper */}
//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
//         <button className="bg-[#3C2A21] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300">
//           Choose Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpgradeCard;
// this is the correct one


// import React from 'react';
// import '../src/app/globals.css';

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   features: string[];
// }

// interface UpgradeCardProps {
//   plan: Plan;
//   userId: string; // Assume this is still passed as a prop for tracking
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
//   const handleChoosePlan = async () => {
//     const email = localStorage.getItem('userEmail'); 
//     const userId = localStorage.getItem('userId'); 
//     if (!email) {
//       alert('User email not found. Please log in.');
//       return;
//     }
   
//     try {
//       const response = await fetch('/api/chapa/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: plan.price,
//           email,
//           userId,
//         }),
//       });

//       const data = await response.json();

//       if (data.checkoutUrl) {
//         // Redirect to Chapa's payment page
//         window.location.href = data.checkoutUrl;
//       } else {
//         alert(data.error || 'Failed to initiate payment'); // Show error from server if available
//       }
      
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       alert('An error occurred while processing the payment.');
//     }    
//   };

//   return (
//     <div
//       key={plan.id}
//       className="bg-[#E5E5CB] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#D5CEA3] h-96 w-80 mx-auto mb-10 group relative"
//     >
//       <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//       <p className="text-2xl font-bold text-[#D5CEA3] group-hover:text-[#3C2A21]">
//         {plan.price} ETB
//       </p>
//       <ul className="my-4 text-left">
//         {Array.isArray(plan.features) && plan.features.length > 0 ? (
//           plan.features.map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D5CEA3] mr-2">
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
//               <span className="text-[#3C2A21]">{feature}</span>
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No features available.</li>
//         )}
//       </ul>
      
//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
//         <button
//           onClick={handleChoosePlan}
//           className="bg-[#3C2A21] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300"
//         >
//           Choose Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpgradeCard;





// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   features: string[];
// }

// interface UpgradeCardProps {
//   plan: Plan;
//   userId: string; // Assume this is passed as a prop for tracking
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
//   const handleChoosePlan = async () => {
//     const email = localStorage.getItem('userEmail'); 
//     const userIdFromStorage = localStorage.getItem('userId'); 

//     if (!email) {
//       alert('User email not found. Please log in.');
//       return;
//     }

//     // Use the userId passed as prop, or the one from localStorage
//     const userIdToUse = userId || userIdFromStorage;

//     try {
//       const response = await fetch('/api/chapa/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: plan.price, // Assuming this is the correct format for the API
//           email,
//           userId: userIdToUse,
//         }),
//       });

//       const data = await response.json();

//       if (data.checkoutUrl) {
//         // Redirect to Chapa's payment page
//         window.location.href = data.checkoutUrl;
//       } else {
//         alert(data.error || 'Failed to initiate payment'); // Show error from server if available
//       }
      
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       alert('An error occurred while processing the payment.');
//     }    
//   };

//   return (
//     <div
//       key={plan.id}
//       className="bg-[#E5E5CB] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#D5CEA3] h-96 w-80 mx-auto mb-10 group relative"
//     >
//       <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
//       <p className="text-2xl font-bold text-[#D5CEA3] group-hover:text-[#3C2A21]">
//         {plan.price} ETB
//       </p>
//       <ul className="my-4 text-left">
//         {Array.isArray(plan.features) && plan.features.length > 0 ? (
//           plan.features.map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D5CEA3] mr-2">
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
//               <span className="text-[#3C2A21]">{feature}</span>
//             </li>
//           ))
//         ) : (
//           <li className="text-gray-500">No features available.</li>
//         )}
//       </ul>
      
//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
//         <button
//           onClick={handleChoosePlan}
//           className="bg-[#3C2A21] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300"
//         >
//           Choose Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpgradeCard;
import React from 'react';
import '../src/app/globals.css';

// Define an interface for your plan
interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

// Define the UpgradeCardProps interface
interface UpgradeCardProps {
  plan: Plan;
  userId: string; // assume this is still passed as a prop for tracking
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, userId }) => {
  const handleChoosePlan = async () => {
      const email = localStorage.getItem('userEmail'); 
      const userIdFromStorage = localStorage.getItem('userId'); 

      if (!email || !userIdFromStorage) {
          alert('User email or ID not found. Please log in.');
          return;
      }

      try {
          const response = await fetch('/api/chapa/payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  amount: plan.price, // Make sure plan.price is a valid amount
                  email,
                  userId: userIdFromStorage, // Use the userId from localStorage
              }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              alert(errorData.error || 'Failed to initiate payment');
              return;
          }

          const data = await response.json();

          // Validate response data
          if (!data.checkoutUrl) {
              throw new Error('Checkout URL not returned');
          }

          window.location.href = data.checkoutUrl;
      } catch (error) {
          console.error('Error initiating payment:', error);
          alert('An error occurred while processing the payment.');
      }
  };

  return (
      <div
          key={plan.id}
          className="bg-[#E5E5CB] shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:bg-[#D5CEA3] h-96 w-80 mx-auto mb-10 group relative"
      >
          <h2 className="text-xl font-semibold text-[#1A120B]">{plan.name}</h2>
          <p className="text-2xl font-bold text-[#D5CEA3] group-hover:text-[#3C2A21]">
              {plan.price} ETB
          </p>
          <ul className="my-4 text-left">
              {Array.isArray(plan.features) && plan.features.length > 0 ? (
                  plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D5CEA3] mr-2">
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
                          <span className="text-[#3C2A21]">{feature}</span>
                      </li>
                  ))
              ) : (
                  <li className="text-gray-500">No features available.</li>
              )}
          </ul>
          
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
              <button
                  onClick={handleChoosePlan}
                  className="bg-[#3C2A21] text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300"
              >
                  Choose Plan
              </button>
          </div>
      </div>
  );
};

export default UpgradeCard;
