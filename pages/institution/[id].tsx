// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Layout from '../../components/PadminMenu';
// import '../../src/app/globals.css'; 

// const InstitutionDetailPage = () => {
  
//   const [isEditMode, setIsEditMode] = useState(false);
//   const router = useRouter();
  
//   const { id } = router.query;
//   const [institution, setInstitution] = useState<any>(null);

//   useEffect(() => {
//     if (id) {
//       axios.get(`/api/institutions/pending/${id}`)
//         .then((response) => setInstitution(response.data))
//         .catch((error) => console.error('Error fetching institution details:', error));
//     }
//   }, [id]);

//   const handleAccept = async () => {
//     try {
//       await axios.post('/api/institutions/accept', { id });
//       router.push('/new-institution'); 
//     } catch (error) {
//       console.error('Error accepting institution:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.post('/api/institutions/reject', { id });
//       router.push('/new-institution'); 
//     } catch (error) {
//       console.error('Error rejecting institution:', error);
//     }
//   };

//   if (!institution) {
//     return <div className="text-center text-[#3C2A21]">Loading...</div>;
//   }

//   return (
//      <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
//     <div className="min-h-screen bg-[#e5e5cb] p-6">
//       <div className="max-w-lg mx-auto bg-[#fff] border border-[#3C2A21] shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">{institution.name}</h1>
//         <p className="text-lg text-[#3C2A21]">Address: <span className="font-medium">{institution.address}</span></p>
//         <p className="text-lg text-[#3C2A21]">Contact Email: <span className="font-medium">{institution.contactEmail}</span></p>
//         <p className="text-lg text-[#3C2A21]">Contact Phone: <span className="font-medium">{institution.contactPhone}</span></p>
//         <p className="text-lg text-[#3C2A21]">Registration Status: <span className="font-medium">{institution.registrationStatus}</span></p>

//         <div className="mt-6 flex justify-around">
//           <button 
//             onClick={handleAccept} 
//             className="bg-[#3C2A21] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition">
//             Accept
//           </button>
//           <button 
//             onClick={handleReject} 
//             className="bg-red-500 text-[#fff] px-4 py-2 rounded-lg hover:bg-red-600 transition">
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
   
//     </Layout>
//   );
// };

// export default InstitutionDetailPage;



// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Layout from '../../components/PadminMenu';
// import '../../src/app/globals.css'; 

// const InstitutionDetailPage = () => {
  
//   const [isEditMode, setIsEditMode] = useState(false);
//   const router = useRouter();
  
//   const { id } = router.query;
//   const [institution, setInstitution] = useState<any>(null);

//   useEffect(() => {
//     if (id) {
//       axios.get(`/api/institutions/pending/${id}`)
//         .then((response) => setInstitution(response.data))
//         .catch((error) => console.error('Error fetching institution details:', error));
//     }
//   }, [id]);

//   const handleAccept = async () => {
//     try {
//       await axios.post('/api/institutions/accept', { id });
//       router.push('/new-institution'); 
//     } catch (error) {
//       console.error('Error accepting institution:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.post('/api/institutions/reject', { id });
//       router.push('/new-institution'); 
//     } catch (error) {
//       console.error('Error rejecting institution:', error);
//     }
//   };

//   if (!institution) {
//     return <div className="text-center text-[#3C2A21]">Loading...</div>;
//   }

//   return (
//     <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
//       <div className="min-h-screen bg-[#e5e5cb] p-6">
//         <div className="max-w-lg mx-auto bg-[#fff] border border-[#3C2A21] shadow-lg rounded-lg p-6">
//           <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">{institution.name}</h1>
          
//           {/* Institution Details */}
//           <p className="text-lg text-[#3C2A21]">Registration Number: <span className="font-medium">{institution.registrationNumber}</span></p>
//           <p className="text-lg text-[#3C2A21]">Address: <span className="font-medium">{institution.address.address}</span></p>
//           <p className="text-lg text-[#3C2A21]">Website: <span className="font-medium">{institution.website}</span></p>
//           <p className="text-lg text-[#3C2A21]">Email Domain: <span className="font-medium">{institution.emailDomain}</span></p>
//           <p className="text-lg text-[#3C2A21]">Collaboration Purpose: <span className="font-medium">{institution.collaborationPurpose}</span></p>
//           <p className="text-lg text-[#3C2A21]">Established On: <span className="font-medium">{new Date(institution.establishDate).toLocaleDateString()}</span></p>
//           <p className="text-lg text-[#3C2A21]">Number of Employees: <span className="font-medium">{institution.numberOfEmploy}</span></p>
//           <p className="text-lg text-[#3C2A21]">Phone: <span className="font-medium">{institution.Phone}</span></p>
//           <p className="text-lg text-[#3C2A21]">Registration Status: <span className="font-medium">{institution.registrationStatus}</span></p>

//           {/* Admin Details */}
//           {/* <h2 className="text-xl font-semibold text-[#3C2A21] mt-4 mb-2">Admin Information</h2>
//           <p className="text-lg text-[#3C2A21]">Admin Name: <span className="font-medium">{institution.admin.f} {institution.admin.lastName}</span></p>
//           <p className="text-lg text-[#3C2A21]">Admin Email: <span className="font-medium">{institution.admin.email}</span></p>
//           <p className="text-lg text-[#3C2A21]">Admin Phone: <span className="font-medium">{institution.admin.phoneNumber}</span></p>
//           <p className="text-lg text-[#3C2A21]">Admin Username: <span className="font-medium">{institution.admin.username}</span></p> */}

//           {/* Photo and Document */}
//           <div className="mt-6">
//             <p className="text-lg text-[#3C2A21]">Institution Photo:</p>
//             <img 
//               src={institution.photo} 
//               alt="Institution Photo" 
//               className="max-w-full h-auto rounded-lg mt-2"
//             />
//           </div>
          
//           <div className="mt-6">
//             <p className="text-lg text-[#3C2A21]">Institution Document:</p>
//             <a href={institution.document} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
//               View Document
//             </a>
//           </div>

//           {/* Accept and Reject Buttons */}
//           <div className="mt-6 flex justify-around">
//             <button 
//               onClick={handleAccept} 
//               className="bg-[#3C2A21] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition">
//               Accept
//             </button>
//             <button 
//               onClick={handleReject} 
//               className="bg-red-500 text-[#fff] px-4 py-2 rounded-lg hover:bg-red-600 transition">
//               Reject
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default InstitutionDetailPage;


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/PadminMenu';
import '../../src/app/globals.css'; 

const InstitutionDetailPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  
  const { id } = router.query;
  const [institution, setInstitution] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/institutions/pending/${id}`)
        .then((response) => setInstitution(response.data))
        .catch((error) => console.error('Error fetching institution details:', error));
    }
  }, [id]);

  const handleAccept = async () => {
    try {
      await axios.post('/api/institutions/accept', { id });
      router.push('/new-institution'); 
    } catch (error) {
      console.error('Error accepting institution:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post('/api/institutions/reject', { id });
      router.push('/new-institution'); 
    } catch (error) {
      console.error('Error rejecting institution:', error);
    }
  };

  if (!institution) {
    return <div className="text-center text-[#3C2A21]">Loading...</div>;
  }

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="min-h-screen bg-[#e5e5cb] p-6">
        <div className="max-w-lg mx-auto bg-[#fff] border border-[#3C2A21] shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">{institution.name}</h1>
          
          {/* Institution Details */}
          <p className="text-lg text-[#3C2A21]">Registration Number: <span className="font-medium">{institution.registrationNumber}</span></p>
          <p className="text-lg text-[#3C2A21]">Address: <span className="font-medium">{institution.address}</span></p>
          <p className="text-lg text-[#3C2A21]">Website: <span className="font-medium">{institution.website}</span></p>
          <p className="text-lg text-[#3C2A21]">Email Domain: <span className="font-medium">{institution.emailDomain}</span></p>
          <p className="text-lg text-[#3C2A21]">Collaboration Purpose: <span className="font-medium">{institution.collaborationPurpose}</span></p>
          <p className="text-lg text-[#3C2A21]">Established On: <span className="font-medium">{new Date(institution.establishDate).toLocaleDateString()}</span></p>
          <p className="text-lg text-[#3C2A21]">Number of Employees: <span className="font-medium">{institution.numberOfEmploy}</span></p>
          <p className="text-lg text-[#3C2A21]">Phone: <span className="font-medium">{institution.Phone}</span></p>
          <p className="text-lg text-[#3C2A21]">Registration Status: <span className="font-medium">{institution.registrationStatus}</span></p>

          {/* Admin Details */}
          <h2 className="text-xl font-semibold text-[#3C2A21] mt-4 mb-2">Admin Information</h2>
          {institution.admin ? (
            <>
              <p className="text-lg text-[#3C2A21]">Admin Name: <span className="font-medium">{institution.admin.firstName} {institution.admin.lastName}</span></p>
              <p className="text-lg text-[#3C2A21]">Admin Email: <span className="font-medium">{institution.admin.email}</span></p>
              <p className="text-lg text-[#3C2A21]">Admin Phone: <span className="font-medium">{institution.admin.phoneNumber}</span></p>
              <p className="text-lg text-[#3C2A21]">Admin Username: <span className="font-medium">{institution.admin.username}</span></p>
            </>
          ) : (
            <p className="text-lg text-[#3C2A21]">No admin assigned</p>
          )}

          {/* Photo and Document */}
          <div className="mt-6">
            <p className="text-lg text-[#3C2A21]">Institution Photo:</p>
            <img 
              src={institution.photo} 
              alt="Institution Photo" 
              className="max-w-full h-auto rounded-lg mt-2"
            />
          </div>
          
          <div className="mt-6">
            <p className="text-lg text-[#3C2A21]">Institution Document:</p>
            <a href={institution.document} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </div>

          {/* Accept and Reject Buttons */}
          <div className="mt-6 flex justify-around">
            <button 
              onClick={handleAccept} 
              className="bg-[#3C2A21] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition">
              Accept
            </button>
            <button 
              onClick={handleReject} 
              className="bg-red-500 text-[#fff] px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Reject
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionDetailPage;
