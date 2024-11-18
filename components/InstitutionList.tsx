// components/InstitutionList.tsx
import React, { useEffect, useState } from 'react';

interface Institution {
  id: number;
  photo?: string;
  name: string;
  address: string;
  type?: string; 
  contactEmail: string;
  contactPhone: string;
  registrationStatus: string; 
}

const InstitutionList: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [institutionsPerPage] = useState<number>(5); // Number of institutions per page

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch('/api/institutions/institutions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInstitutions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchInstitutions();
  }, []);

  if (error) return <div>Error: {error}</div>;

  // Pagination logic
  const indexOfLastInstitution = currentPage * institutionsPerPage;
  const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
  const currentInstitutions = institutions.slice(indexOfFirstInstitution, indexOfLastInstitution);
  const totalPages = Math.ceil(institutions.length / institutionsPerPage);

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

  return (
    <div>
      <h1>Institution List</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Contact Email</th>
            <th>Contact Phone</th>
            <th>Registration Status</th>
          </tr>
        </thead>
        <tbody>
          {currentInstitutions.map((institution, index) => (
            <tr key={institution.id}>
              <td>{index + 1 + indexOfFirstInstitution}</td>
              <td>{institution.name}</td>
              <td>{institution.address}</td>
              <td>{institution.type}</td>
              <td>{institution.contactEmail}</td>
              <td>{institution.contactPhone}</td>
              <td>{institution.registrationStatus}</td>
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
        img {
          border-radius: 50%;
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

export default InstitutionList;
