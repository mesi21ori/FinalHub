import React from 'react';

interface DeleteAccountButtonProps {
  userId: number;
}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({ userId }) => {
  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      return;
    }

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        alert('Your account has been deleted.');
        // Optionally, you can redirect or perform other actions here
      } else {
        const data = await response.json();
        alert(`Failed to delete account: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while trying to delete your account.');
    }
  };

  return <button onClick={handleDeleteAccount}>Delete Account</button>;
};

export default DeleteAccountButton;
