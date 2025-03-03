"use client";

import React from "react";

interface SubscriptionDetails {
  plan: string;
  nextBillingDate: string;
  features: string[];
}

const CurrentSubscription: React.FC<{ subscription: SubscriptionDetails }> = ({
  subscription,
}) => {
  return (
    <div className="bg-[#f7f4f0] shadow-lg rounded p-6 mb-6 glow-effect">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
        Current Subscription
      </h2>
      <p className="text-lg text-gray-700 text-center sm:text-left">
        You are subscribed to the{" "}
        <span className="font-bold text-[#CD853F]">{subscription.plan}</span>{" "}
        plan.
      </p>
      <p className="text-sm text-gray-600 mt-2 text-center sm:text-left">
        Next billing date: {subscription.nextBillingDate}
      </p>
      <ul className="mt-4 space-y-2">
        {subscription.features.map((feature, index) => (
          <li
            key={index}
            className="text-sm text-gray-700 flex items-center justify-start sm:justify-start"
          >
            <span className="bg-[#3a2f2c] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs mr-2">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentSubscription;