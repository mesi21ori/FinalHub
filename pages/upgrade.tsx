

"use client";

import React, { useEffect, useState } from "react";
import UpgradeCard from "../components/UpgradeCard";
import Link from "next/link";

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

const UpgradePage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId); // Store userId in state

    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/admin/get-subscription-plans');

        if (!response.ok) {
          throw new Error('Failed to fetch subscription plans');
        }

        const data: Plan[] = await response.json();
        setPlans(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center">Loading subscription plans...</p>; 
  }

  return (
    <div>
      <header className="w-full bg-[#3C2A21] text-[#E5E5CB] p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Logo</h1>
          <Link href="/content" className="text-[#E5E5CB]">
            Back
          </Link>
          <Link href="/dashboard" className="text-[#E5E5CB]">
          Account
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center p-8 bg-gradient-to-b from-[#E5E5CB] to-[#3C2A21] min-h-screen opacity-90">
        <h1 className="text-3xl font-bold mb-8 text-[#3C2A21]">Choose the Right Plan for You</h1>
        {error && <p className="text-red-600 text-center">{error}</p>} {/* Centered error message */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <UpgradeCard key={plan.id} plan={plan} userId={userId || ''} /> 
            ))
          ) : (
            <p className="text-center">No subscription plans available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
