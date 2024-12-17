"use client";
import { useState, useEffect } from "react";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import axios from "axios";
import { useRouter } from 'next/navigation';  // Make sure this is from 'next/navigation' for App Router
import Link from "next/link";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // Start with the button disabled
  const [error, setError] = useState('');
  
  // Initialize router for navigation (useRouter from 'next/navigation' for App Router)
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

        // Redirect based on role immediately
        console.log("Redirecting based on user role:", role);
        if (role === 'PUBLIC_USER') {
          router.push('/content/content-page'); // Redirect to content page for PUBLIC_USER
        } else if (role === 'INSTITUTION_ADMIN') {
          router.push('/institution-admin/dashboard');
        } else if (role === 'PLATFORM_ADMIN') {
          router.push('/platform-admin');
        } else if (role === 'UPLOADER') {
          router.push('/uploader');
        } else if (role === 'REVIEWER') {
          router.push('/reviewer/dashboard');
        } else if (role === 'PREMIUM_USER') {
          router.push('/content');
        } else {
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

  // Update isDisabled state based on form inputs
  useEffect(() => {
    if (username && password) {
      setIsDisabled(false); // Enable button when both fields are filled
    } else {
      setIsDisabled(true); // Disable button if any field is empty
    }
  }, [username, password]); // Run this effect whenever username or password changes

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center">
      {/* Main Box for Sign In */}
      <div className="w-full max-w-md p-8 mt-16 bg-[#E5E5CB] shadow-md rounded-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Welcome back!</h1>
          <p className="text-[#3e251c] font-thin">Enter your credentials to access your account</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Using InputField components */}
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(value: string) => setUsername(value)} // Pass value directly
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(value: string) => setPassword(value)} // Pass value directly
          />

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-[#3e251c] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Conditionally render the button */}
          {isDisabled ? (
            <DisabledButton
              isEnabled={false}
              onClick={() => { }} // Provide an empty onClick handler when disabled
              label="Sign In" // Pass the label here
            />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3e251c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
            >
              Sign In
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[#3e251c]">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
