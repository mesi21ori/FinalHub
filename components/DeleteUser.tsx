import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function DeleteUser() {
  const [error, setError] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  const handleDelete = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.delete('/api/users/delete', {
          data: { id: userId },
        });

        if (response.status === 200) {
          setSuccessMessage('User deleted successfully');
          setError(''); // Clear any previous error
          // Redirect after a short delay
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message);
          setSuccessMessage(''); // Clear any previous success message
        } else {
          setError('An unexpected error occurred');
          setSuccessMessage(''); // Clear any previous success message
        }
      }
    }
  };

  const confirmDelete = () => {
    // Display the confirmation dialog
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    // Handle the user's response to the confirmation dialog
    setShowConfirmation(false);
    if (confirmed) {
      handleDelete();
    }
  };

  return (
    <div>
      <button onClick={confirmDelete}>Delete Account</button>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <button onClick={() => handleConfirmation(true)}>Yes, Delete</button>
          <button onClick={() => handleConfirmation(false)}>Cancel</button>
        </div>
      )}

      {/* Show success or error messages */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <style jsx>{`
        .confirmation-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background-color: white;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .confirmation-dialog button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
}
