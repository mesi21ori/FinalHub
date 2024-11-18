// // pages/institution/dashboard.tsx

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import AddStaff from '../../components/AddStaff';
// import InstitutionContentList from '../../components/InstitutionContentList';
// import StaffList from '../../components/StaffList';

// interface InstitutionStatusResponse {
//   registrationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
// }

// const InstitutionDashboard: React.FC = () => {
//   const router = useRouter();
//   const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [institutionId, setInstitutionId] = useState<number | null>(null); // State to hold institution ID

//   useEffect(() => {
//     // Check if running in browser and set institutionId
//     if (typeof window !== 'undefined') {
//       const id = Number(localStorage.getItem('institutionId'));
//       setInstitutionId(id);
//     }
//   }, []);

//   useEffect(() => {
//     if (institutionId !== null) {
//       const fetchStatus = async () => {
//         try {
//           const response = await axios.get<InstitutionStatusResponse>('/api/institutions/status', {
//             params: { id: institutionId },
//           });

//           setStatus(response.data.registrationStatus);
//           setLoading(false);

//           if (response.data.registrationStatus === 'REJECTED') {
//             alert('Your institution has been rejected. Please contact support for further assistance.');
//             router.push('/rejected');
//           } else if (response.data.registrationStatus === 'PENDING') {
//             alert('Your institution is still under review. Please check back later.');
//             router.push('/pending');
//           }
//         } catch (error) {
//           console.error('Failed to fetch institution status:', error);
//           setError('Failed to fetch institution status. Please try again later.');
//           setLoading(false);
//         }
//       };

//       fetchStatus();
//     }
//   }, [institutionId, router]);

//   if (loading) {
//     return <div className="spinner"></div>; // Display loading spinner
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>; // Display error message
//   }

//   if (status === 'APPROVED') {
//     return (
//       <div>
//         <h1>Institution Admin Dashboard</h1>
//         <AddStaff />
//         <InstitutionContentList institutionId={institutionId!} /> {/* Use non-null assertion as we check for null above */}
//         <StaffList institutionId={Number(institutionId)} />
//       </div>
//     );
//   }

//   return null; // If not approved, render nothing
// };

// export default InstitutionDashboard;



// pages/institution/dashboard.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import InstitutionContentList from '../../components/InstitutionContentList';
import Layout from '../../components/InstitutionAdminMenu';

const InstitutionDashboard: React.FC = () => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [institutionId, setInstitutionId] = useState<number | null>(null); 
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null); // State to hold staff ID for editing

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = Number(localStorage.getItem('institutionId'));
      setInstitutionId(id);
    }
  }, []);

  useEffect(() => {
    if (institutionId !== null) {
      const fetchStatus = async () => {
        try {
          const response = await axios.get('/api/institutions/status', {
            params: { id: institutionId },
          });

          setStatus(response.data.registrationStatus);
          setLoading(false);

          if (response.data.registrationStatus === 'REJECTED') {
            alert('Your institution has been rejected. Please contact support for further assistance.');
            router.push('/rejected');
          } else if (response.data.registrationStatus === 'PENDING') {
            alert('Your institution is still under review. Please check back later.');
            router.push('/pending');
          }
        } catch (error) {
          console.error('Failed to fetch institution status:', error);
          setError('Failed to fetch institution status. Please try again later.');
          setLoading(false);
        }
      };

      fetchStatus();
    }
  }, [institutionId, router]);

  const handleEditStaff = (id: number) => {
    setEditingStaffId(id); // Set the staff ID to be edited
  };

  if (loading) {
    return <div className="spinner"></div>; 
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; 
  }

  if (status === 'APPROVED') {
    return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div>
        <InstitutionContentList institutionId={institutionId!} />
      </div>
      </Layout>
    );
  }

  return null; 
};

export default InstitutionDashboard;
