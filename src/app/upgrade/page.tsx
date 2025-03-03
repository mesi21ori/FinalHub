// src/app/upgrade/page.tsx

"use client"; 

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import UpgradeCard from "../../../components/UpgradeCard";
import LogoNavBar from "../../../components/LogoNavBar";
import { FiArrowLeft } from "react-icons/fi";

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

const UpgradePage: React.FC = () => {
  const router = useRouter(); 
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 

  useEffect(() => {
   
    const storedUserId = sessionStorage.getItem('userId');
    const storedEmail = sessionStorage.getItem('email');
    setUserId(storedUserId || '');
    setEmail(storedEmail || ''); 

    
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/users/getplan');
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
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#3a2f2c] to-[#F7F6E9] opacity-90">
      {/* Logo Navbar */}
      <div className="mb-8">
        <LogoNavBar />
      </div>

      {/* Back Arrow Button */}
      <button
        onClick={() => router.back()} 
        className="absolute top-14 left-8 text-[#F7F6E9] p-2 rounded-full hover:bg-[#3a2f2c]"
      >
        <FiArrowLeft size={24} />
      </button>

      {/* Page Content */}
      <div className="flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-8 text-[#F7F6E9]">
          Choose the Right Plan for You
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <UpgradeCard key={plan.id} plan={plan} userId={userId} />
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
