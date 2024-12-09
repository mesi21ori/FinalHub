"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing icons
import '../src/app/globals.css'; // Adjust this path based on your structure

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Signing in with:', { username, password });

    try {
      const response = await axios.post('/api/auth/signin', { username, password });
      console.log('Response from server:', response.data);

      if (response.status === 200) {
        const { token, role, institutionStatus, institutionId, fname, lname, id, email } = response.data;

        // Check if the user account is deactivated
        if (response.data.isActive === false) {
          setError('Your account is deactivated. Please contact support.');
          return; // Exit the function early
        }

        // Save user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userFname', fname);
        localStorage.setItem('userLname', lname);
        localStorage.setItem('userId', id.toString());
        localStorage.setItem('userEmail', email);
        if (institutionId !== null) {
          localStorage.setItem('institutionId', institutionId.toString());
        }

        // Role-based redirection logic
        switch (role) {
          case 'INSTITUTION_ADMIN':
            if (institutionStatus === 'REJECTED') {
              setError('Your institution has been rejected.');
            } else if (institutionStatus === 'PENDING') {
              setError('Your institution is still under review. Please check back later.');
            } else if (institutionStatus === 'APPROVED') {
              router.push('/institution-admin/dashboar'); // Redirect to dashboard
            }
            break;
          case 'PLATFORM_ADMIN':
            router.push('/platform-admin');
            break;
          case 'UPLOADER':
            router.push('/uploader');
            break;
          case 'REVIEWER':
            router.push('/reviewer/dashboard');
            break;
          case 'PUBLIC_USER':
            router.push('/content');
            break;
          case 'PREMIUM_USER':
            router.push('/content');
            break;
          default:
            router.push('/home');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Failed to sign in.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
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

      {/* Main Box for Sign In */}
      <div className="w-full max-w-md p-8 mt-16 bg-[#E5E5CB] shadow-md rounded-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Welcome back!</h1>
          <p className="text-[#3e251c]">Enter your credentials to access your account</p>
        </header>

        {/* Sign In Form */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username" className="block text-[#3e251c]">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#3e251c]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute right-2 top-2 text-[#3C2A21]"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />} {/* Toggle icon */}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-[#3e251c] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3e251c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#3e251c]">
          Don't have an account?{" "}
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
