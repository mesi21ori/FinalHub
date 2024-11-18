// components/feedback.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<number | null>(null); // Initialize as null

  useEffect(() => {
    // This code only runs in the browser
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setMessage('User ID not found. Please log in.');
      return;
    }

    try {
      const response = await axios.post('/api/users/feedback', {
        content,
        userId, // User ID is now guaranteed to be a number
      });
      setMessage(response.data.message);
      setContent(''); // Clear the form after submission
    } catch (error) {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      {userId ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your feedback"
            rows={4}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to submit feedback.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackPage;
