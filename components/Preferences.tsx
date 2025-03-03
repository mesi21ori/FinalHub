"use client";

import React, { useEffect, useState } from "react";
import DisabledButton from "./DisabledButton";

const PreferencesPage = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null); 
  // List of preference options
  const preferences = [
    "Wars", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"
  ];

   useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(parseInt(storedUserId, 10));
      }
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

  const handleSubmit = async () => {
    if (!isButtonEnabled) return;

    try {
      // Replace with the actual user ID, maybe from session or context
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
        window.location.href = '/signin';
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3C2A21]">Select Your Preferences</h2>
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
            onClick={handleSubmit} 
            label="Start It"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
