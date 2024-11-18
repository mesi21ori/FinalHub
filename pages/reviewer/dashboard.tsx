import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/ReviwerMenu';
import '../../src/app/globals.css';

interface PendingRequest {
  id: number;
  researcher: {
    name: string;
  };
  content: {
    title: string;
  };
  researcherFile?: string; // Add researcherFile for the file link
}

const ReviewerDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [reviewerId, setReviewerId] = useState<string | null>(null);
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReviewerId = localStorage.getItem('userId');
      if (storedReviewerId) {
        setReviewerId(storedReviewerId);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (reviewerId) {
        try {
          const response = await axios.get('/api/reviewer/get-pending-requests', {
            params: { reviewerId }
          });
          setPendingRequests(response.data);
        } catch (error) {
          console.error('Error fetching pending requests:', error);
        }
      }
    };

    fetchPendingRequests();
  }, [reviewerId]);

  const handleAcceptRequest = async (requestId: number) => {
    try {
      await axios.put('/api/reviewer/accept-request', {
        requestId: requestId,
        reviewerId: reviewerId,
      });
      setPendingRequests(pendingRequests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    try {
      await axios.put('/api/reviewer/reject-request', {
        requestId: requestId,
        reviewerId: reviewerId,
      });
      setPendingRequests(pendingRequests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div style={{ padding: '30px', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#3e251c', fontSize: '28px', marginBottom: '20px' }}>
          Pending Access Requests
        </h1>

        {pendingRequests.length === 0 ? (
          <p style={{ color: '#3C2A21', fontSize: '16px' }}>No pending requests.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {pendingRequests.map((request) => (
              <li
                key={request.id}
                style={{
                  backgroundColor: '#e5e5cb',
                  padding: '20px',
                  marginBottom: '15px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <p style={{ color: '#3e251c', fontSize: '18px', fontWeight: 'bold' }}>
                  {request.researcher.name} has requested access to "{request.content.title}"
                </p>

                {/* Render researcher file download/view link if available */}
                {request.researcherFile ? (
                  <a
                    href={`/uploads/resercher/${request.researcherFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#3C2A21',
                      textDecoration: 'none',
                      marginRight: '15px',
                      fontSize: '16px',
                      display: 'inline-block',
                      marginBottom: '10px',
                    }}
                  >
                    View Researcher File
                  </a>
                ) : (
                  <p style={{ color: '#3C2A21', fontSize: '14px', fontStyle: 'italic' }}>
                    No file provided
                  </p>
                )}

                <div style={{ marginTop: '15px' }}>
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    style={{
                      backgroundColor: '#3e251c',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      marginRight: '15px',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#5b3929';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3e251c';
                    }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    style={{
                      backgroundColor: '#3C2A21',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4a2c1f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3C2A21';
                    }}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default ReviewerDashboard;
