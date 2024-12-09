import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Content {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  contentType: string;
  accessLevel: string;
  category: string; // History Category
  uploader: {
    email: string;
    username: string;
  };
}

const InstitutionContentList = () => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Adjust how many items per page

  useEffect(() => {
    const fetchContent = async () => {
      const institutionId = localStorage.getItem('institutionId'); // Get institutionId from local storage

      if (!institutionId) {
        setError('Institution ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/institutions/content', {
          params: { institutionId },
        });

        setContentList(response.data);
      } catch (error) {
        setError('Error fetching content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(contentList.length / itemsPerPage);

  if (loading) return <p>Loading content...</p>;
  if (error) return <p>{error}</p>;
  if (contentList.length === 0) return <p>No content available</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#E5E5CB' }}>
      <h2 style={{ color: '#3C2A21', textAlign: 'center' }}>Uploaded Content</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#E5E5CB',
          border: `1px solid #4B3B31`,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Title
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Description
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Uploader
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Access Level
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Content Type
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              History Category
            </th>
            <th
              style={{
                backgroundColor: '#3C2A21',
                color: 'white',
                padding: '10px',
                borderBottom: '2px solid #4B3B31',
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((content) => (
            <tr key={content.id}>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.title}
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.description}
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.uploader.username} ({content.uploader.email})
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.accessLevel}
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.contentType}
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                {content.category}
              </td>
              <td
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #4B3B31',
                }}
              >
                <a
                  href={content.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: '#4B3B31',
                    fontWeight: 'bold',
                  }}
                >
                  View File
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#3C2A21',
            color: 'white',
            border: 'none',
            padding: '10px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Previous
        </button>
        <span
          style={{
            alignSelf: 'center',
            color: '#3C2A21',
            fontSize: '18px',
            marginRight: '10px',
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: '#3C2A21',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstitutionContentList;
