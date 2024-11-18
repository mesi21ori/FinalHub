// pages/platformadmin/feedback.tsx

import { useEffect, useState } from 'react'
import axios from 'axios'

type Feedback = {
  id: number
  content: string
  createdAt: string
  resolved: boolean
  user: {
    id: number
    username: string
    email: string
  }
}

const Allfeedback= () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const feedbacksPerPage = 5

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('/api/feedback/getfeedback', {
          headers: { role: 'PLATFORM_ADMIN' }, // Set role as needed
        })
        setFeedbacks(response.data)
      } catch (error) {
        setError('Failed to load feedback')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  const resolveFeedback = async (id: number) => {
    try {
      await axios.put(`/api/feedback/feedback/${id}`, { resolved: true })
      setFeedbacks(feedbacks.map(fb => (fb.id === id ? { ...fb, resolved: true } : fb)))
    } catch (error) {
      setError('Failed to resolve feedback')
    }
  }

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) return <p>Loading feedback...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="feedback-container" style={{ padding: '2rem', backgroundColor: '#E5E5CB' }}>
      <h1 style={{ color: '#3e251c', marginBottom: '1rem' }}>User Feedback</h1>
      
      <table className="feedback-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#3C2A21', color: '#fff' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>User</th>
            <th style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>Email</th>
            <th style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>Content</th>
            <th style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>Date</th>
            <th style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map(feedback => (
            <tr key={feedback.id} style={{ backgroundColor: '#fff' }}>
              <td style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>{feedback.user.username}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>{feedback.user.email}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>{feedback.content}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>
                {new Date(feedback.createdAt).toLocaleDateString()}
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #3e251c' }}>
                <button
                  onClick={() => resolveFeedback(feedback.id)}
                  disabled={feedback.resolved}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: feedback.resolved ? '#3C2A21' : '#E5E5CB',
                    color: feedback.resolved ? '#fff' : '#3C2A21',
                    border: 'none',
                    cursor: feedback.resolved ? 'not-allowed' : 'pointer'
                  }}
                >
                  {feedback.resolved ? 'Resolved' : 'Resolve'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination" style={{ marginTop: '1rem', textAlign: 'center' }}>
        {Array.from({ length: Math.ceil(feedbacks.length / feedbacksPerPage) }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={{
              padding: '0.5rem 1rem',
              margin: '0.25rem',
              backgroundColor: currentPage === number ? '#3C2A21' : '#E5E5CB',
              color: currentPage === number ? '#fff' : '#3C2A21',
              border: '1px solid #3e251c',
              cursor: 'pointer'
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Allfeedback
