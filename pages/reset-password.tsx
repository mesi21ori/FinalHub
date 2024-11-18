// // pages/reset-password.tsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function ResetPassword() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const { token } = router.query;

//   const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Validate password confirmation
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/reset-password', { token, password });
//       setMessage('Password reset successful. You can now sign in.');
//       setError(''); // Clear any previous errors
//       router.push('/signin'); // Redirect to sign-in page after successful reset
//     } catch (error) {
//       setError('Failed to reset password. Please try again.');
//       setMessage(''); // Clear any previous messages
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <form onSubmit={handleResetPassword}>
//         <div>
//           <label htmlFor="password">New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//         {error && <p className="text-red-500">{error}</p>}
//         {message && <p>{message}</p>}
//       </form>
//     </div>
//   );
// }

// app/reset-password/page.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../src/app/globals.css'; 

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query; 

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', { token, password });
      setMessage('Password reset successful. You can now sign in.');
      setError(''); 
      router.push('/signin');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setMessage(''); 
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center">
      {/* Header with Logo and Back to Home */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-4">
        <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
        <Link href="/" className="text-[#D5CEA3] hover:underline">
          Back to home
        </Link>
      </div>

      {/* Main Box for Reset Password */}
      <div className="w-full max-w-md p-8 bg-[#E5E5CB] rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Reset Password</h1>
          <p className="text-[#3e251c]">
            Enter and confirm your new password.
          </p>
        </header>

        {/* Form for resetting password */}
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="password" className="block text-[#3e251c]">New Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-[#3e251c]">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3e251c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
          >
            Reset Password
          </button>
        </form>

        {/* Message and Error display */}
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Link to sign in */}
        <p className="mt-6 text-center text-sm text-[#3e251c]">
          Remembered your password?{" "}
          <Link href="/signin" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
