
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/app/globals.css';

export default function AddStaff() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setgender] = useState('MALE');
  const [phoneNumber, setphoneNumber] = useState('');
  const [role, setRole] = useState('UPLOADER');
  const [password, setPassword] = useState('');
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get institutionId from local storage
  useEffect(() => {
    const id = localStorage.getItem('institutionId');
    console.log('Institution ID from local storage:', id);
    if (id) {
      setInstitutionId(Number(id));
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ensure that the required fields are not empty
    if (!username || !email || !password || !institutionId) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('/api/institutions/add-staff', {
        firstName,
        username,
        lastName,
        gender,
        //phoneNumber,
        email,
        role,
        password,
        institutionId,
      });

      setSuccess('Staff member added successfully.');
      setError('');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e5cb]">
      <div className="bg-[#e5e5cb] border-2 border-[#3C2A21] p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-[#3C2A21] text-center mb-6">Add Staff Member</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#3C2A21]">
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#3C2A21]">
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#3C2A21]">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3C2A21]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#3C2A21]">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            >
              <option value="UPLOADER">Uploader</option>
              <option value="REVIEWER">Reviewer</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3C2A21]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="institutionId" className="block text-sm font-medium text-[#3C2A21]">
              Institution ID
            </label>
            <input
              type="number"
              id="institutionId"
              value={institutionId ?? ''}
              readOnly
              className="w-full p-2 rounded-md bg-white text-[#3C2A21] border border-[#3C2A21]"
            />
          </div>
          <div>
            <label> Gender</label>
            <select name="gender"
            onChange={(e) => setgender(e.target.value)}>
              
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          {/* <div>
            <label> Phone</label>
            <input type="text" name="phoneNumber" 
           onChange={(e) => setphoneNumber(e.target.value)}
           required />
          </div> */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-[#3C2A21] text-white font-semibold hover:bg-[#2f1e17] transition-colors"
            >
              Add Staff
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
}
