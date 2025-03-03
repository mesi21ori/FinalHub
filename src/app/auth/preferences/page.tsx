"use client";

import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import DisabledButton from "../../../../components/DisabledButton";

const PreferencesPage = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state
  const [userId, setUserId] = useState<number | null>(null); 
  // List of preference options
  const preferences = [
    "Wars", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"
  ];

  // Simulate initial page loading, and hide the spinner after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
    console.log('Stored User ID:', storedUserId);
  }, []);
  // Toggle the selected preference
  const handleTogglePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference) // Remove if already selected
        : [...prev, preference] // Add if not selected
    );
  };

  // Check if at least one option is selected
  const isButtonEnabled = selectedPreferences.length > 0;

  // Handle the "Start It" button click (no loading spinner)
  // Handle the "Start It" button click (no loading spinner)
const handleStartClick = async () => {
  console.log('User ID:', userId);
  if (!isButtonEnabled) return;

  try {
    const response = await fetch('/api/users/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        preferences: selectedPreferences,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful response
      console.log('Preferences updated:', data.message);
      // Redirect or show success message, if needed
      window.location.href = '/auth/sign-in';
    } else {
      // Handle error response
      console.error('Error:', data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Something went wrong. Please try again later.');
  }
};


  if (loading) {
    return <LoadingSpinner />; // Show the loading spinner while the page is loading
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3a2f2c]">Select Your Preferences</h2>
        <div className="grid grid-cols-2 gap-4">
          {preferences.map((preference, index) => (
            <button
              key={index}
              onClick={() => handleTogglePreference(preference)}
              className={`w-full py-2 px-4 rounded-md font-semibold ${
                selectedPreferences.includes(preference)
                  ? "bg-[#3a2f2c] text-[#E5E5CB] border-2 border-[#3a2f2c]"
                  : "bg-transparent border-2 border-[#3a2f2c] text-[#3a2f2c]"
              } hover:bg-[#3a2f2c] hover:text-[#E5E5CB] transition-all duration-200 ease-in-out`}
            >
              {preference}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {/* Use DisabledButton and pass 'isEnabled' prop */}
          <DisabledButton
            isEnabled={isButtonEnabled}
            onClick={handleStartClick} // Trigger the page navigation without loading spinner
            label="Start It"
          />
        </div>
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default PreferencesPage;