"use client"; // This line makes the component a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // for navigation
import '../src/app/globals.css';  // Ensure this points to the correct Layout component

const LogoutButton: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter(); // Get router instance for navigation

  const handleLogout = async () => {
    try {
      // Perform logout logic
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      // After logout, redirect to the sign-in page or home page
      router.push('/auth/signin');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
   
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
        <div className="flex-grow"> {/* Use flex-grow to fill the space without scrolling */}
          <button
            onClick={handleLogout}
            className="bg-[#3C2A21] text-white py-2 px-4 rounded"
            style={{ marginTop: '20px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

  );
};

export default LogoutButton;
