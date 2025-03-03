// components/UpdateUser.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../src/app/globals.css'; 

interface UpdateUserProps {
  onSave: () => void;
} 
export default function UpdateUser({ onSave }: UpdateUserProps) {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Get user ID from localStorage when the component mounts
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    
    // Fetch user details from API to populate the form
    if (storedUserId) {
      axios.get(`/api/users/${storedUserId}`)
        .then(response => {
          const user = response.data;
          
          setEmail(user.email);
          setUsername(user.username);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data.');
        });
    }
  }, []);

  const handleUpdate = async () => {
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    try {
      await axios.put('/api/users/update', {
        
        email,
        username,
        password,
        userId,
      });

      console.log('User updated');
      // Redirect to dashboard
      onSave(); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };
  const handleback = async () => { 

  }
  return (
    <div>
      <h1>Update User</h1>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleUpdate}>Save</button>
      {error && <p className="text-red-500">{error}</p>}
      
    </div>
  );
}
