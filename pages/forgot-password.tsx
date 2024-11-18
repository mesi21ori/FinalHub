// // pages/forgot-password.tsx
// import { useState } from 'react';
// import axios from 'axios';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('/api/auth/forgot-password', { email });
//       setMessage('If the email exists, a reset link will be sent.');
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//       setMessage(''); // Clear any previous messages
//     }
//   };

//   return (
//     <div>
//       <h1>Forgot Password</h1>
//       <form onSubmit={handleForgotPassword}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// }

// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import '../src/app/globals.css'; 

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage('If the email exists, a reset link will be sent.');
      setError(''); 
    } catch (error) {
      setError('An error occurred. Please try again.');
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

      {/* Main Box for Forgot Password */}
      <div className="w-full max-w-md p-8 bg-[#E5E5CB] rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Forgot Password</h1>
          <p className="text-[#3e251c]">
            Enter your email to reset your password.
          </p>
        </header>

        {/* Form for forgot password */}
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <div>
            <label htmlFor="email" className="block text-[#3e251c]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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


