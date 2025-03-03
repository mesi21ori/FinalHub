// "use client";

// import React from "react";
// import CurrentSubscription from "../../../../components/CurrentSubscription";
// import CancelSubscription from "../../../../components/CancelSubscription";

// const SubscriptionPage: React.FC = () => {
//   // Mocked subscription data (Replace with actual API data)
//   const subscription = {
//     plan: "Premium",
//     nextBillingDate: "January 31, 2025",
//     features: ["Unlimited Access", "Priority Support", "Custom Reports"],
//   };

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Heading for the Subscription Page */}
//         <h1 className="text-2xl font-bold text-[#3C2A21] mb-4 text-center md:text-left">
//           Manage Your Subscription
//         </h1>

//         {/* Current Subscription Component */}
//         <CurrentSubscription subscription={subscription} />

//         {/* Cancel Subscription Component */}
//         <CancelSubscription subscription={subscription} />
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import CurrentSubscription from "../../../../components/CurrentSubscription"; // Assuming this component exists
// import CancelSubscription from "../../../../components/CancelSubscription"; // Assuming this component exists

// // Subscription details interface
// interface SubscriptionDetails {
//   plan: string;
//   nextBillingDate: string;
//   features: string[];
// }

// const SubscriptionPage: React.FC = () => {
//   const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch the user ID from sessionStorage
//     const userId = sessionStorage.getItem("userId");
//     if (userId) {
//       fetchSubscription(userId);
//     } else {
//       setError("User ID is not found in session storage.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchSubscription = async (userId: string) => {
//     try {
     
//       const res = await fetch(`/api/users/subscription/subscription?userId=${userId}`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch subscription");
//       }
//       const data = await res.json();
//       setSubscription(data);
//       setLoading(false);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message || "An error occurred while fetching the subscription.");
//       } else {
//         setError("An error occurred while fetching the subscription.");
//       }
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Heading for the Subscription Page */}
//         <h1 className="text-2xl font-bold text-[#3C2A21] mb-4 text-center md:text-left">
//           Manage Your Subscription
//         </h1>

//         {/* Current Subscription Component */}
//         {subscription ? (
//           <CurrentSubscription subscription={subscription} />
//         ) : (
//           <div>No active subscription found.</div>
//         )}

//         {/* Cancel Subscription Component */}
//         {subscription ? (
//           <CancelSubscription subscription={subscription} />
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;

"use client";

import React, { useState, useEffect } from "react";
import CurrentSubscription from "../../../../components/CurrentSubscription"; // Assuming this component exists
import CancelSubscription from "../../../../components/CancelSubscription"; // Assuming this component exists

// Subscription details interface
interface SubscriptionDetails {
  plan: string;
  nextBillingDate: string;
  features: string[];
}

const SubscriptionPage: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user ID from sessionStorage
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetchSubscription(userId);
    } else {
      setError("User ID is not found in session storage.");
      setLoading(false);
    }
  }, []);

  const fetchSubscription = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/subscription/subscription?userId=${userId}`);
      if (res.status === 404) {
        // No active subscription found
        setSubscription(null);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const data = await res.json();
      setSubscription(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred while fetching the subscription.");
      } else {
        setError("An error occurred while fetching the subscription.");
      }
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f7f4f0] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading for the Subscription Page */}
        <h1 className="text-2xl font-bold text-[#3C2A21] mb-4 text-center md:text-left">
          Manage Your Subscription
        </h1>

        {/* Current Subscription Component */}
        {subscription ? (
          <CurrentSubscription subscription={subscription} />
        ) : (
          <div className="text-center text-gray-600">
            You have no active subscription plan.
            <p>
              Explore our{" "}
              <a href="/upgrade" className="text-[#3C2A21]  underline">
                plans
              </a>{" "}
              to find the best fit for you!
            </p>
          </div>
        )}

        {/* Cancel Subscription Component */}
        {subscription ? (
          <CancelSubscription subscription={subscription} />
        ) : null}
      </div>
    </div>
  );
};

export default SubscriptionPage;
