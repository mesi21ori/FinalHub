"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-opacity-50 bg-white-700 fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="flex items-center justify-center">
        <div className="border-t-4 border-b-4 border-transparent border-solid w-16 h-16 border-t-[#3a2f2c] animate-spin rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;