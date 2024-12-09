
"use client"; 

import React, { useState } from 'react';

import '../../src/app/globals.css'; 
import AddStaff from '../../components/AddStaff';
import Layout from '../../components/InstitutionAdminMenu';
import InstitutionContentList from '../../components/InstitutionContentList';

const UserListPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
       
        <div className="flex-grow"> {/* Use flex-grow to fill the space without scrolling */}
          <InstitutionContentList/>
        </div>
      </div>
    </Layout>
  );
};

export default UserListPage;