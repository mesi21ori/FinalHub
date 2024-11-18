"use client"; // This line makes the component a Client Component

import React, { useState } from 'react';// Ensure this points to the correct Layout component

import '../../src/app/globals.css'; 
import Layout from '../../components/PadminMenu';
import Allfeedback from '../../components/Allfeedback';
const UserListPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
        <div className="flex-grow"> {/* Use flex-grow to fill the space without scrolling */}
        <Allfeedback/>
        </div>
      </div>
    </Layout>
  );
};

export default UserListPage;