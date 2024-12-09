import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Preferences = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null); 
  const router = useRouter();

  const preferences = [
    'Ancient History',
    'Medieval History',
    'Modern History',
    'Economic History',
    'Political History',
    'Ethiopian Revolution',
    'Ethiopian Nationalism',
    'Ethiopian Literature',
  ];

  // Use useEffect to load userId only on the client-side
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const togglePreference = (preference: string) => {
    setSelectedPreferences((prevState) =>
      prevState.includes(preference)
        ? prevState.filter((pref) => pref !== preference)
        : [...prevState, preference]
    );
  };

  const handleSubmit = async () => {
    if (!selectedPreferences.length) {
      alert('Please select at least one preference.');
      return;
    }
  
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
  
    console.log('Sending data:', { userId, preferences: selectedPreferences });
  
    try {
      const response = await fetch('/api/users/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, preferences: selectedPreferences }),
      });
  
      const data = await response.json();
      console.log('API response:', data);
  
      if (response.ok) {
        alert('Preferences saved successfully!');
        router.push('/content'); // Redirect
      } else {
        alert(data.message || 'Failed to save preferences.');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Something went wrong.');
    }
  };
  
  return (
    <div className="min-h-screen bg-cream p-10">
      <header className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold">Logo</div>
        <button
          onClick={() => router.push('/')} // Back to Home functionality
          className="text-sm text-gray-500"
        >
          Back to Home
        </button>
      </header>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold">Select Your Preferences</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {preferences.map((preference, index) => (
          <button
            key={index}
            className={`border-2 px-4 py-2 rounded-md text-center ${
              selectedPreferences.includes(preference)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            } hover:bg-blue-500 hover:text-white`}
            onClick={() => togglePreference(preference)}
          >
            {preference}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`py-2 px-6 rounded-md ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 text-white hover:bg-yellow-400'
          }`}
        >
          {isLoading ? 'Saving...' : 'Start It'}
        </button>
      </div>
    </div>
  );
};

export default Preferences;
