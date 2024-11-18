// // // components/EditStaff.tsx

// // import { useEffect, useState } from 'react';

// // type StaffMember = {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   username: string;
// //   role: string;
// //   isActive: boolean;
// // };

// // const EditStaff = ({ staffId }: { staffId: number }) => {
// //   const [staff, setStaff] = useState<StaffMember | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [formData, setFormData] = useState<Partial<StaffMember>>({});

// //   useEffect(() => {
// //     const fetchStaffMember = async () => {
// //       try {
// //         const res = await fetch(`/api/institutions/staff/${staffId}`);
// //         const data = await res.json();
// //         if (res.ok) {
// //           setStaff(data);
// //           setFormData(data); // Populate form with existing data
// //         } else {
// //           setError(data.message || 'Failed to fetch staff member details');
// //         }
// //       } catch (error) {
// //         setError('An error occurred while fetching staff member details.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStaffMember();
// //   }, [staffId]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`/api/institutions/staff/${staffId}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (res.ok) {
// //         alert('Staff member updated successfully');
// //       } else {
// //         const data = await res.json();
// //         setError(data.message || 'Failed to update staff member');
// //       }
// //     } catch (error) {
// //       setError('An error occurred while updating staff member.');
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p className="text-red-500">{error}</p>;
// //   if (!staff) return <p>No staff member found.</p>;

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Edit Staff Member</h2>
// //       <label>
// //         Email:
// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email || ''}
// //           onChange={handleChange}
// //           required
// //         />
// //       </label>
// //       <br />
// //       <label>
// //         Username:
// //         <input
// //           type="text"
// //           name="username"
// //           value={formData.username || ''}
// //           onChange={handleChange}
// //           required
// //         />
// //       </label>
// //       <br />
// //       <label>
// //         Role:
// //         <select name="role" value={formData.role || ''} onChange={handleChange} required>
// //           <option value="">Select Role</option>
// //           <option value="UPLOADER">Uploader</option>
// //           <option value="REVIEWER">Reviewer</option>
// //         </select>
// //       </label>
// //       <br />
// //       <button type="submit">Update Staff Member</button>
// //     </form>
// //   );
// // };

// // export default EditStaff;





// // components/EditStaff.tsx

// import { useEffect, useState } from 'react';
// import '../src/app/globals.css'; 

// type StaffMember = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   role: string;
//   isActive: boolean;
// };

// interface EditStaffProps {
//   staffId: number;
//   onClose: () => void; // Add onClose prop
// }

// const EditStaff = ({ staffId, onClose }: EditStaffProps) => {
//   const [staff, setStaff] = useState<StaffMember | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Partial<StaffMember>>({});

//   useEffect(() => {
//     const fetchStaffMember = async () => {
//       try {
//         const res = await fetch(`/api/institutions/staff/${staffId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setStaff(data);
//           setFormData(data);
//         } else {
//           setError(data.message || 'Failed to fetch staff member details');
//         }
//       } catch (error) {
//         setError('An error occurred while fetching staff member details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaffMember();
//   }, [staffId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/institutions/staff/${staffId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         alert('Staff member updated successfully');
//         onClose(); // Close the edit form
//       } else {
//         const data = await res.json();
//         setError(data.message || 'Failed to update staff member');
//       }
//     } catch (error) {
//       setError('An error occurred while updating staff member.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!staff) return <p>No staff member found.</p>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Staff Member</h2>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email || ''}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Username:
//         <input
//           type="text"
//           name="username"
//           value={formData.username || ''}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Role:
//         <select name="role" value={formData.role || ''} onChange={handleChange} required>
//           <option value="">Select Role</option>
//           <option value="UPLOADER">Uploader</option>
//           <option value="REVIEWER">Reviewer</option>
//         </select>
//       </label>
//       <br />
//       <button type="submit">Update Staff Member</button>
//       <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
//         Close
//       </button>
//     </form>
//   );
// };

// export default EditStaff;



import { useEffect, useState } from 'react';
import '../src/app/globals.css';

type StaffMember = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
};

interface EditStaffProps {
  staffId: number;
  onClose: () => void;
}

const EditStaff = ({ staffId, onClose }: EditStaffProps) => {
  const [staff, setStaff] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<StaffMember>>({});

  useEffect(() => {
    const fetchStaffMember = async () => {
      try {
        const res = await fetch(`/api/institutions/staff/${staffId}`);
        const data = await res.json();
        if (res.ok) {
          setStaff(data);
          setFormData(data);
        } else {
          setError(data.message || 'Failed to fetch staff member details');
        }
      } catch (error) {
        setError('An error occurred while fetching staff member details.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMember();
  }, [staffId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/institutions/staff/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Staff member updated successfully');
        // Call onClose to close the form only after successful update
        onClose();
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to update staff member');
      }
    } catch (error) {
      setError('An error occurred while updating staff member.');
    }
  };

  if (loading) return <p className="text-center text-lg mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!staff) return <p className="text-center text-lg mt-4">No staff member found.</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3C2A21]/75 z-50">
      <div className="bg-[#e5e5cb] p-6 rounded-lg w-full max-w-md shadow-lg text-[#3C2A21]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4 text-center">Edit Staff Member</h2>
          
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-[#3C2A21]"
              style={{ backgroundColor: "#e5e5cb", color: "#3C2A21", borderColor: "#3C2A21" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="block text-sm font-medium">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-[#3C2A21]"
              style={{ backgroundColor: "#e5e5cb", color: "#3C2A21", borderColor: "#3C2A21" }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-[#3C2A21]"
              style={{
                backgroundColor: "#e5e5cb", 
                color: "#3C2A21", 
                borderColor: "#3C2A21" 
              }}
            >
              <option value="">Select Role</option>
              <option value="UPLOADER">Uploader</option>
              <option value="REVIEWER">Reviewer</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#3C2A21] text-[#e5e5cb] hover:bg-[#5A3F32]"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#e5e5cb] text-[#3C2A21] hover:bg-[#D3C5A3]"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
