import React, { useEffect, useState } from 'react';
import Layout from '../../components/InstitutionAdminMenu';
import '../../src/app/globals.css';
interface StaffMember {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean; // Added the isActive property
}


const StaffList: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching staff
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [staffPerPage] = useState<number>(10);
  const [institutionId, setInstitutionId] = useState<string | null>(null); // Added state to hold institutionId
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch institutionId from localStorage only on the client-side
  useEffect(() => {
    const storedInstitutionId = localStorage.getItem('institutionId');
    if (storedInstitutionId) {
      setInstitutionId(storedInstitutionId); // Set institutionId from localStorage
    } else {
      setError('You are not associated with any institution.');
      setLoading(false); // Stop loading if no institutionId is found
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (!institutionId) {
      return; // Don't fetch staff members if institutionId is not set
    }

    // Fetch staff members for the current institution
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch(`/api/institutions/staff/list/${institutionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStaffMembers(data.staffMembers); // Ensure the correct data structure from the API
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // Set loading to false after fetching or on error
      }
    };

    fetchStaffMembers();
  }, [institutionId]); // Dependency on institutionId so that data refetches when the institution changes

  if (loading) return <p>Loading staff members...</p>;
  if (error) return <div>Error: {error}</div>;

  // Pagination logic
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaffMembers = staffMembers.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(staffMembers.length / staffPerPage);

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

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/institutions/staff/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }), // ensure the body is correct
      });

      if (!response.ok) {
        throw new Error('Error updating staff status');
      }

      setStaffMembers((prevStaff) =>
        prevStaff.map((staff) =>
          staff.id === id ? { ...staff, isActive: !currentStatus } : staff
        )
      );
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
};


  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
    <div>
      <h1>Staff List</h1>
      {error && <p>{error}</p>} {/* Display error message */}
      {!error && (
        <>
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
              {currentStaffMembers.map((staff, index) => (
                <tr key={staff.id}>
                  <td>{index + 1 + indexOfFirstStaff}</td>
                  <td>{staff.username}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                  <td>{staff.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(staff.id, staff.isActive)}
                      style={{
                        backgroundColor: '#3C2A21',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {staff.isActive ? 'Deactivate' : 'Activate'}
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
        </>
      )}
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
    </Layout>
  );
};

export default StaffList;
