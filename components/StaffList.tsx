// // import { useEffect, useState } from 'react';
// // import UpdateUser from './UpdateUser';
// // import DeleteUser from './DeleteUser';

// // type StaffMember = {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   username: string;
// //   role: string;
// //   isActive: boolean;
// // };

// // const StaffList = ({ institutionId }: { institutionId: number }) => {
// //   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchStaffMembers = async () => {
// //       try {
// //         const res = await fetch(`/api/institutions/staff/list/${institutionId}`);
// //         const data = await res.json();
// //         setStaffMembers(data.staffMembers || []);
// //       } catch (error) {
// //         if (error instanceof Error) {
// //           console.error("Error fetching staff members:", error.message);
// //         } else {
// //           console.error("An unknown error occurred while fetching staff members");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStaffMembers();
// //   }, [institutionId]);

// //   if (loading) return <p>Loading staff members...</p>;
// //   if (staffMembers.length === 0) return <p>No staff members found.</p>;

// //   return (
// //     <div>
// //       <h2>Institution Staff Members</h2>
// //       <ul>
// //         {staffMembers.map((member) => (
// //           <li key={member.id}>
// //             <p>
// //               {member.firstName} {member.lastName} ({member.role}) - {member.email}
// //             </p>
// //             <DeleteUser/>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default StaffList;



// // //components/StaffList.tsx   update yalew

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

// // // Define the props for the StaffList component
// // interface StaffListProps {
// //   institutionId: number;
// //   onEdit: (id: number) => void; // Include the onEdit prop type
// // }

// // const StaffList: React.FC<StaffListProps> = ({ institutionId, onEdit }) => {
// //   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchStaffMembers = async () => {
// //       try {
// //         const res = await fetch(`/api/institutions/staff/list/${institutionId}`);
// //         const data = await res.json();
// //         setStaffMembers(data.staffMembers || []);
// //       } catch (error) {
// //         console.error("Error fetching staff members:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStaffMembers();
// //   }, [institutionId]);

// //   if (loading) return <p>Loading staff members...</p>;
// //   if (staffMembers.length === 0) return <p>No staff members found.</p>;

// //   return (
// //     <div>
// //       <h2>Institution Staff Members</h2>
// //       <ul>
// //         {staffMembers.map((member) => (
// //           <li key={member.id}>
// //             <p>
// //               {member.firstName} {member.lastName} ({member.role}) - {member.email}
// //             </p>
// //             <button onClick={() => onEdit(member.id)}>Edit</button> {/* Add Edit button */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default StaffList;


// // components/StaffList.tsx

// import { useEffect, useState } from 'react';

// type StaffMember = {
//   id: number;
//   email: string;
//   username: string;
//   role: string;
//   isActive: boolean;
// };

// // Update the props to include onEdit
// type StaffListProps = {
//   institutionId: number;
//   onEdit: (id: number) => void; // Add the onEdit prop
// };

// const StaffList = ({ institutionId, onEdit }: StaffListProps) => {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStaffMembers = async () => {
//       try {
//         const res = await fetch(`/api/institutions/staff/list/${institutionId}`);
//         const data = await res.json();
//         setStaffMembers(data.staffMembers || []);
//       } catch (error) {
//         console.error("Error fetching staff members:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaffMembers();
//   }, [institutionId]);

//   const handleToggleActive = async (id: number, currentStatus: boolean) => {
//     try {
//       const response = await fetch(`/api/institutions/staff/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ isActive: !currentStatus }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error updating staff member: ${response.statusText}`);
//       }

//       setStaffMembers((prev) =>
//         prev.map((member) =>
//           member.id === id ? { ...member, isActive: !currentStatus } : member
//         )
//       );
//     } catch (error) {
//       console.error("Error toggling active status:", error);
//     }
//   };

//   if (loading) return <p>Loading staff members...</p>;
//   if (staffMembers.length === 0) return <p>No staff members found.</p>;

//   return (
//     <div>
//       <h2>Institution Staff Members</h2>
//       <ul>
//         {staffMembers.map((member) => (
//           <li key={member.id}>
//             <p>
//               {member.username} ({member.role}) - {member.email}
//               <button onClick={() => handleToggleActive(member.id, member.isActive)}>
//                 {member.isActive ? 'Deactivate' : 'Activate'}
//               </button>
//               <button onClick={() => onEdit(member.id)}>Edit</button> {/* Use onEdit prop */}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StaffList;




// components/UserList.tsx
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean; // Added the isActive property
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchUsers();
  }, []);

  if (error) return <div>Error: {error}</div>;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle Active/Inactive Status
  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Error updating user status');
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1 + indexOfFirstUser}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  onClick={() => handleToggleActive(user.id, user.isActive)}
                  style={{
                    backgroundColor: '#3C2A21',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        button {
          margin: 5px;
          padding: 5px 10px;
        }
        button:disabled {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default UserList;
