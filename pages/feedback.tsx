"use client"; 
import React, { useState } from 'react';
import '../src/app/globals.css'; 
import FeedbackPage from '../components/feedback';

const UserListPage: React.FC = () => {

  return (
    
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
       
        <div className="flex-grow"> {/* Use flex-grow to fill the space without scrolling */}
          <FeedbackPage/>
        </div>
      </div>
  );
};

export default UserListPage;