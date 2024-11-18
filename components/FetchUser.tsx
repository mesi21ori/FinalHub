import { useEffect, useState } from 'react';

export default function UserDetails() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setError('Error fetching user details');
          }
        } catch (error) {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details */}
        </div>
      )}
    </div>
  );
}
