// import FileUpload from '../components/FileUpload';
// import ContentList from '../components/ContentList';
// import FetchUser from '../components/FetchUser';
// import { useState } from 'react';
// import UpdateUser from '../components/UpdateUser';


// export default function UploadPage() {
//   const [editing, setEditing] = useState(false);
//   return (
//     <div>
//         {editing ? (
//         <UpdateUser onSave={() => setEditing(false)} />
//       ) : (
//         <div>
//       <h1>Upload Page</h1>
//       <FileUpload />
//       <ContentList/>
//       <FetchUser />
//       <button onClick={() => setEditing(true)}>Edit Profile</button>
    
//     </div>
//       )}
//      </div>
    
//   );
// }




"use client"; // This line makes the component a Client Component

import React, { useState } from 'react';// Ensure this points to the correct Layout component

import '../src/app/globals.css'; 
import Layout from './testn';
import FileUpload from '../components/FileUpload';

const UserListPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="flex flex-col h-screen bg-[#E5E5CB] p-6">
       
        <div className="flex-grow"> {/* Use flex-grow to fill the space without scrolling */}
          <FileUpload/>
        </div>
      </div>
    </Layout>
  );
};

export default UserListPage;