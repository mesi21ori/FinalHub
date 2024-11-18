"use client"; // This line makes the component a Client Component

import React, { useState } from 'react';// Ensure this points to the correct Layout component
import UserList from '../components/UserList';
import Layout from '../components/PadminMenu';
import '../src/app/globals.css'; 
import FetchUser from '../components/FetchUser';
const UserListPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
       
        <div className="flex-grow"> 
          <UserList />
        </div>
      </div>
    </Layout>
  );
};

export default UserListPage;